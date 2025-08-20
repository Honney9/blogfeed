'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetails({ blog }) {
    if (!blog) return null;

    const createdDate = new Date(blog.$createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const updatedDate = blog.$updatedAt
        ? new Date(blog.$updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <Link href="/">
                <motion.button
                    whileHover={{ x: -5 }}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 group cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Blogs</span>
                </motion.button>
            </Link>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="mb-6">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {blog.category}
                    </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {blog.title}
                </h1>

                <div className="flex items-center justify-between mb-6 text-gray-600">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <User className="h-5 w-5" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-5 w-5" />
                             <span>
                                {createdDate}
                                {updatedDate && updatedDate !== createdDate
                                    ? ` (Updated: ${updatedDate})`
                                    : ''}
                            </span>
                        </div>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden"
            >
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="prose prose-lg max-w-none"
            >
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {blog.content}
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-gray-200"
            >
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}