'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import BlogActions from './BlogActions';

export default function BlogCard({ blog, index, showActions = false, onEdit, onDelete }) {
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative"
        >
            {/* Admin Actions Button */}
            {showActions && (
                <div className="absolute top-4 right-4 z-10">
                    <BlogActions blog={blog} onEdit={onEdit} onDelete={onDelete} />
                </div>
            )}

            <div className="relative h-48 overflow-hidden">
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {blog.category}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {blog.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description}
                </p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {createdDate}
                                {updatedDate && updatedDate !== createdDate
                                    ? ` (Updated: ${updatedDate})`
                                    : ''}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                
                <Link href={`/blog/${blog.$id}`}>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group cursor-pointer"
                    >
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
}
