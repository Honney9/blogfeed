'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { deleteBlog } from '@/lib/appwrite';

export default function BlogActions({ blog, onEdit, onDelete }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteBlog(blog.$id);
            onDelete(blog.$id);
            setShowDeleteConfirm(false);
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Error deleting blog. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <MoreVertical className="h-4 w-4" />
            </button>

            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-20"
                    >
                        <button
                            onClick={() => {
                                onEdit(blog);
                                setShowMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <Edit className="h-4 w-4 text-blue-600" />
                            <span>Edit Blog</span>
                        </button>
                        <button
                            onClick={() => {
                                setShowDeleteConfirm(true);
                                setShowMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-red-600 transition-colors cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete Blog</span>
                        </button>
                    </motion.div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg p-6 w-full max-w-md"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete Blog
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {deleting ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                                {deleting ? 'Deleting...' : 'Delete'}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}