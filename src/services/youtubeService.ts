// YouTube Data API v3 Service
// Fetches videos from specified YouTube channels

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  videoUrl: string;
  duration?: string;
  viewCount?: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  handle: string;
  url: string;
}

// Your YouTube channels
export const YOUTUBE_CHANNELS: YouTubeChannel[] = [
  {
    id: 'UCChannelId1', // This will be populated when we get the actual channel IDs
    title: "Sharvari's Healthy Kitchen Hindi",
    handle: '@SHK-Hindi',
    url: 'https://www.youtube.com/@SHK-Hindi'
  },
  {
    id: 'UCChannelId2', // This will be populated when we get the actual channel IDs
    title: "Sharvari's Healthy Kitchen Marathi",
    handle: '@SHK-Marathi',
    url: 'https://www.youtube.com/@SHK-Marathi'
  }
];

class YouTubeService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    // You'll need to add your YouTube API key to environment variables
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('YouTube API key not found. Please add VITE_YOUTUBE_API_KEY to your environment variables.');
    }
  }

  // Get channel ID from channel handle
  async getChannelIdFromHandle(handle: string): Promise<string | null> {
    if (!this.apiKey) return null;

    try {
      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${this.apiKey}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch channel data');
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        return data.items[0].snippet.channelId;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching channel ID for ${handle}:`, error);
      return null;
    }
  }

  // Fetch videos from a specific channel
  async getChannelVideos(channelId: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    if (!this.apiKey) return [];

    try {
      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch videos');
      
      const data = await response.json();
      
      if (!data.items) return [];

      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    } catch (error) {
      console.error(`Error fetching videos for channel ${channelId}:`, error);
      return [];
    }
  }

  // Fetch videos from multiple channels
  async getAllChannelVideos(maxResultsPerChannel: number = 5): Promise<YouTubeVideo[]> {
    if (!this.apiKey) {
      console.warn('YouTube API key not available. Using fallback data.');
      return this.getFallbackVideos();
    }

    try {
      const allVideos: YouTubeVideo[] = [];
      
      for (const channel of YOUTUBE_CHANNELS) {
        // First get the actual channel ID if we don't have it
        let channelId = channel.id;
        if (!channelId || channelId.startsWith('UCChannelId')) {
          channelId = await this.getChannelIdFromHandle(channel.handle) || '';
        }
        
        if (channelId) {
          const videos = await this.getChannelVideos(channelId, maxResultsPerChannel);
          allVideos.push(...videos);
        }
      }
      
      // Sort by published date (newest first)
      return allVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
      console.error('Error fetching all channel videos:', error);
      return this.getFallbackVideos();
    }
  }

  // Fallback data when API is not available
  private getFallbackVideos(): YouTubeVideo[] {
    return [
      {
        id: "a03c6J_1nfc",
        title: "Classic Butter Chicken",
        description: "Learn to make authentic butter chicken with traditional spices and techniques.",
        thumbnail: "https://img.youtube.com/vi/a03c6J_1nfc/maxresdefault.jpg",
        publishedAt: new Date().toISOString(),
        channelTitle: "Sharvari's Healthy Kitchen Hindi",
        channelId: "UCChannelId1",
        videoUrl: "https://www.youtube.com/watch?v=a03c6J_1nfc"
      },
      {
        id: "QgdBc9uOTh4",
        title: "Homemade Paneer Tikka",
        description: "Delicious paneer tikka recipe with homemade paneer and aromatic spices.",
        thumbnail: "https://img.youtube.com/vi/QgdBc9uOTh4/maxresdefault.jpg",
        publishedAt: new Date().toISOString(),
        channelTitle: "Sharvari's Healthy Kitchen Marathi",
        channelId: "UCChannelId2",
        videoUrl: "https://www.youtube.com/watch?v=QgdBc9uOTh4"
      },
      {
        id: "P1CokHHDbNw",
        title: "Healthy Quinoa Salad Bowl",
        description: "Nutritious quinoa salad bowl packed with fresh vegetables and protein.",
        thumbnail: "https://img.youtube.com/vi/P1CokHHDbNw/maxresdefault.jpg",
        publishedAt: new Date().toISOString(),
        channelTitle: "Sharvari's Healthy Kitchen Hindi",
        channelId: "UCChannelId1",
        videoUrl: "https://www.youtube.com/watch?v=P1CokHHDbNw"
      },
      {
        id: "WSzIDaQyCQE",
        title: "Chocolate Chip Cookies",
        description: "Perfect chocolate chip cookies with a crispy edge and chewy center.",
        thumbnail: "https://img.youtube.com/vi/WSzIDaQyCQE/maxresdefault.jpg",
        publishedAt: new Date().toISOString(),
        channelTitle: "Sharvari's Healthy Kitchen Marathi",
        channelId: "UCChannelId2",
        videoUrl: "https://www.youtube.com/watch?v=WSzIDaQyCQE"
      }
    ];
  }

  // Search for videos related to a specific recipe
  async searchRecipeVideos(recipeName: string): Promise<YouTubeVideo[]> {
    if (!this.apiKey) return [];

    try {
      const searchQuery = `${recipeName} recipe cooking`;
      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=3&key=${this.apiKey}`
      );
      
      if (!response.ok) throw new Error('Failed to search videos');
      
      const data = await response.json();
      
      if (!data.items) return [];

      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    } catch (error) {
      console.error(`Error searching videos for recipe ${recipeName}:`, error);
      return [];
    }
  }
}

export const youtubeService = new YouTubeService();
