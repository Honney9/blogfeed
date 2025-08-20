'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { getBlogs } from '@/lib/appwrite';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // Hero typewriter state
    const fullText = "Welcome to BlogFeed";
    const subText = "Dive Into a World of Knowledge, Discover Fresh Perspectives, and Satisfy Your Hunger for New Ideas—One Story at a Time.";
    const [displayedText, setDisplayedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const fetchedBlogs = await getBlogs();
                setBlogs(fetchedBlogs); // Only Appwrite data
            } catch (error) {
                console.error('Error loading blogs:', error);
                setBlogs([]); // empty array if fetch fails
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    useEffect(() => {
        let filtered = blogs;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    }, [searchQuery, selectedCategory, blogs]);

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) {
            clearInterval(interval);
            setTypingDone(true); // typing finished
            }
        }, 120); // adjust typing speed
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl sm:text-4xl font-bold text-gray-900 mb-4">
                    <span>
                        {displayedText.includes("BlogFeed")
                        ? displayedText.replace("BlogFeed", "")
                        : displayedText}
                    </span>
                    <span className="text-blue-600">
                        {displayedText.includes("BlogFeed")
                        ? displayedText.slice(displayedText.indexOf("BlogFeed"))
                        : ""}
                    </span>
                    {!typingDone && <span className="blinking-cursor">|</span>}
                </h1>
            <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: fullText.length * 0.1, duration: 1 }}
            >
                {subText}
            </motion.p>

                <style jsx>{`
                    .blinking-cursor {
                        display: inline-block;
                        width: 1ch;
                        animation: blink 1s step-start infinite;
                    }
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `}</style>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-12 space-y-6">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            {/* Results Count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
            >
                <p className="text-gray-600">
                    {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'} found
                </p>
            </motion.div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog, index) => (
                        <BlogCard key={blog.$id} blog={blog} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        No blogs found
                    </h3>
                    <p className="text-gray-600">
                        Try adjusting your search terms or category filter.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
