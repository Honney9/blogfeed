'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onCreateBlog, showAdminActions = false }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">BlogFeed</span>
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Admin
                        </Link>
                        
                        {showAdminActions && onCreateBlog && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onCreateBlog}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                New Blog
                            </motion.button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        {showAdminActions && onCreateBlog && (
                            <button
                                onClick={onCreateBlog}
                                className="p-2 bg-blue-600 text-white rounded-lg"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t"
                    >
                        <div className="py-4 space-y-2">
                            <Link 
                                href="/" 
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/admin" 
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}