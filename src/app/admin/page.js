'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import BlogForm from '@/components/BlogForm';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Navbar from '@/components/NavBar';
import { getBlogs } from '@/lib/appwrite';

export default function AdminPage() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    useEffect(() => {
        filterBlogs();
    }, [searchQuery, selectedCategory, blogs]);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const fetchedBlogs = await getBlogs();
            setBlogs(fetchedBlogs); // Only Appwrite data
        } catch (error) {
            console.error('Error loading blogs:', error);
            setBlogs([]); // Empty if fetch fails
        } finally {
            setLoading(false);
        }
    };

    const filterBlogs = () => {
        let filtered = blogs;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    };

    const handleCreateBlog = () => {
        setEditingBlog(null);
        setShowForm(true);
    };

    const handleEditBlog = (blog) => {
        setEditingBlog(blog);
        setShowForm(true);
    };

    const handleSaveBlog = (savedBlog) => {
        if (editingBlog) {
            setBlogs(prevBlogs =>
                prevBlogs.map(blog =>
                    blog.$id === editingBlog.$id ? { ...savedBlog, $id: editingBlog.$id } : blog
                )
            );
        } else {
            // Optionally, fetch the newly created blog from Appwrite
            setBlogs(prevBlogs => [savedBlog, ...prevBlogs]);
        }

        setShowForm(false);
        setEditingBlog(null);
    };

    const handleDeleteBlog = (blogId) => {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.$id !== blogId));
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingBlog(null);
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                    />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Admin Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Blog <span className="text-blue-600">Administration</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Manage your blogs - create, edit, and delete articles
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Blogs</h3>
                        <p className="text-3xl font-bold text-blue-600">{blogs.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {[...new Set(blogs.map(blog => blog.category))].length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Authors</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {[...new Set(blogs.map(blog => blog.author))].length}
                        </p>
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 space-y-4"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCreateBlog}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Plus className="h-5 w-5" />
                            Create New Blog
                        </motion.button>
                    </div>
                    
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </motion.div>

                {/* Results */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <p className="text-gray-600">
                        {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'} found
                    </p>
                </motion.div>

                {/* Blog Grid */}
                {filteredBlogs.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredBlogs.map((blog, index) => (
                            <BlogCard
                                key={blog.$id}
                                blog={blog}
                                index={index}
                                showActions={true}
                                onEdit={handleEditBlog}
                                onDelete={handleDeleteBlog}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            No blogs found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {blogs.length === 0 
                                ? "Get started by creating your first blog post!"
                                : "Try adjusting your search terms or category filter."
                            }
                        </p>
                        {blogs.length === 0 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCreateBlog}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Plus className="h-5 w-5" />
                                Create Your First Blog
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* Blog Form Modal */}
                <AnimatePresence>
                    {showForm && (
                        <BlogForm
                            blog={editingBlog}
                            onSave={handleSaveBlog}
                            onCancel={handleCancelForm}
                            isEdit={!!editingBlog}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
