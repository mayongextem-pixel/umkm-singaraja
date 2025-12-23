// API Configuration
// You can set NEXT_PUBLIC_API_URL in .env.local to override this
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api',
};

// Helper functions
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.API_BASE}${endpoint}`;
};

export const getImageUrl = (imagePath) => {
    if (!imagePath) return '/no-image.jpg';
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise construct full URL
    return `${API_CONFIG.BASE_URL}${imagePath}`;
};
