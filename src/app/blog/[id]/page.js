import BlogDetails from '@/components/BlogDetails';
import { getBlog } from '@/lib/appwrite';
import { notFound } from 'next/navigation';

export default async function BlogDetailPage({ params }) {
    const { id } = params;

    let blog;
    try {
        blog = await getBlog(id); 
    } catch (error) {
        console.error('Error fetching blog:', error);
        blog = null;
    }

    if (!blog) {
        return notFound(); 
    }

    return (
        <BlogDetails blog={blog} />
    );
}
