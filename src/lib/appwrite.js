import { Client, Databases, Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
export const categoriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID;

// Fetch all blogs
export const getBlogs = async (category = '', searchQuery = '') => {
    try {
        const queries = [];
        
        if (category && category !== 'all') {
            queries.push(Query.equal('category', category));
        }
        
        if (searchQuery) {
            queries.push(Query.search('title', searchQuery));
        }
        
        const response = await databases.listDocuments(
            databaseId,
            collectionId,
            queries
        );
        
        return response.documents;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
};

// Fetch single blog
export const getBlog = async (id) => {
    try {
        const response = await databases.getDocument(
            databaseId,
            collectionId,
            id
        );
        return response;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
};

// Create new blog
export const createBlog = async (blogData) => {
    try {
        const response = await databases.createDocument(
            databaseId,
            collectionId,
            'unique()', // Auto-generate ID
            {
                ...blogData
            }
        );
        return response;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Update existing blog
export const updateBlog = async (id, blogData) => {
    try {
        const response = await databases.updateDocument(
            databaseId,
            collectionId,
            id,
            {
                ...blogData,
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Delete blog
export const deleteBlog = async (id) => {
    try {
        await databases.deleteDocument(
            databaseId,
            collectionId,
            id
        );
        return true;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

// Get categories for dropdown
export const getCategories = async () => {
  try {
    const response = await databases.listDocuments(databaseId, categoriesCollectionId);
    
    // Assuming attribute is "name"
    return response.documents.map(doc => doc.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};