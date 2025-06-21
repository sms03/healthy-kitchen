import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';

export const useYouTubeVideos = (maxResultsPerChannel: number = 5) => {
  return useQuery({
    queryKey: ['youtubeVideos', maxResultsPerChannel],
    queryFn: () => youtubeService.getAllChannelVideos(maxResultsPerChannel),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

export const useRecipeVideos = (recipeName: string) => {
  return useQuery({
    queryKey: ['recipeVideos', recipeName],
    queryFn: () => youtubeService.searchRecipeVideos(recipeName),
    enabled: !!recipeName,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};

// Hook to find matching video for a recipe
export const useMatchingVideo = (recipeName: string, allVideos: YouTubeVideo[] = []) => {
  const [matchingVideo, setMatchingVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    if (!recipeName || !allVideos.length) {
      setMatchingVideo(null);
      return;
    }

    // Try to find a video that matches the recipe name
    const normalizedRecipeName = recipeName.toLowerCase().trim();
    
    // First, try exact match
    let video = allVideos.find(v => 
      v.title.toLowerCase().includes(normalizedRecipeName)
    );

    // If no exact match, try partial matches with key words
    if (!video) {
      const recipeWords = normalizedRecipeName.split(/\s+/).filter(word => word.length > 2);
      video = allVideos.find(v => {
        const titleWords = v.title.toLowerCase().split(/\s+/);
        return recipeWords.some(word => titleWords.some(titleWord => titleWord.includes(word)));
      });
    }

    // If still no match, try matching any word
    if (!video && allVideos.length > 0) {
      const recipeWords = normalizedRecipeName.split(/\s+/).filter(word => word.length > 3);
      video = allVideos.find(v => {
        return recipeWords.some(word => v.title.toLowerCase().includes(word));
      });
    }

    setMatchingVideo(video || null);
  }, [recipeName, allVideos]);

  return matchingVideo;
};
