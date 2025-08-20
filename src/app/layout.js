import './globals.css';
import Navbar from '@/components/NavBar';

export const metadata = {
    title: 'BlogFeed - Feed Your Curiosity',
    description: 'Dive Into a World of Knowledge, Discover Fresh Perspectives, and Satisfy Your Hunger for New Ideas—One Story at a Time.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body className="bg-gray-50 min-h-screen">
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}