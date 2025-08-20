'use client';
import { motion } from 'framer-motion';

const categories = ['all', 'Entertainment', 'Food', 'Science', 'Sports', 'Travel', 'Technology'];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
        >
            {categories.map((category) => (
                <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {category === 'all' ? 'All Categories' : category}
                </motion.button>
            ))}
        </motion.div>
    );
}
