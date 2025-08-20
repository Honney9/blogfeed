'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, Trash2 } from 'lucide-react';
import { createBlog, updateBlog, getCategories } from '@/lib/appwrite';

export default function BlogForm({ blog, onSave, onCancel, isEdit = false }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        thumbnail: '',
        category: '',
        tags: [],
        author: ''
    });
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load existing blog data for editing
        if (isEdit && blog) {
            setFormData({
                title: blog.title || '',
                description: blog.description || '',
                content: blog.content || '',
                thumbnail: blog.thumbnail || '',
                category: blog.category || '',
                tags: blog.tags || [],
                author: blog.author || ''
            });
        }

        // Load categories
        const loadCategories = async () => {
            const cats = await getCategories();
            setCategories(cats);
            console.log(cats)
        };
        loadCategories();
    }, [blog, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            let result;
            if (isEdit) {
                result = await updateBlog(blog.$id, formData);
            } else {
                result = await createBlog(formData);
            }
            
            onSave(result);
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Error saving blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isEdit ? 'Edit Blog' : 'Create New Blog'}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter blog title"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter blog description"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={10}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.content ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter blog content (supports markdown)"
                            />
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thumbnail URL *
                            </label>
                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
                            {formData.thumbnail && (
                                <div className="mt-2">
                                    <img
                                        src={formData.thumbnail}
                                        alt="Thumbnail preview"
                                        className="h-32 w-48 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Category and Author */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author *
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.author ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Author name"
                                />
                                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter a tag"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddTag(e);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}