# BlogFeed

**BlogFeed** is a modern, responsive blogging platform built with **Next.js**, **React**, and **Appwrite**. It allows users to explore blogs, filter by categories, search for content, and manage posts through an admin interface.

---

## Features

- **Dynamic Blog Listing**: Display all blogs fetched from Appwrite.
- **Search & Filter**: Filter blogs by categories or search keywords.
- **Blog Details**: View full blog content with author, category, and tags.
- **Admin Panel**: Create, edit, and delete blog posts.
- **Responsive Design**: Mobile-friendly and visually appealing UI.
- **Smooth Animations**: Implemented using Framer Motion, including typewriter effect for hero section.
- **Tags & Categories**: Easy management and display of blog tags and categories.
- **Image Handling**: Optimized images using Next.js `<Image>` component.

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion  
- **Backend & Database**: Appwrite  
- **Authentication**: Appwrite Users (optional for admin panel)  
- **Icons**: Lucide React  

---

## Setup Instructions

1. Initialize Next.js Project

If you haven’t already created a Next.js project:

```bash
npx create-next-app@latest blogfeed
cd blogfeed

2. **Clone the repository:**

```bash
git clone https://github.com/Honney9/blogfeed.git
cd blogfeed
npm install

npm install appwrite, framer-motion, lucide-react, next, react, react-dom

3. **Setup Variables**
NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<your-database-id>
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=<your-blog-collection-id>
NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID=<your-categories-collection-id>

4. **Run the development server:**
npm run dev