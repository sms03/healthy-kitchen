# YouTube Integration Setup Guide

This guide explains how to set up YouTube Data API v3 integration for fetching videos from your YouTube channels.

## Prerequisites

1. A Google Cloud Console account
2. YouTube channels: 
   - https://www.youtube.com/@SHK-Hindi
   - https://www.youtube.com/@SHK-Marathi

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project (required for API access)

### 2. Enable YouTube Data API v3

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

### 3. Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key (it should start with "AIza...")
4. (Optional but recommended) Restrict the key:
   - Click on the key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"

### 4. Configure the Application

1. In your project root, create or update the `.env` file:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   ```
2. Replace `your_actual_api_key_here` with the API key you copied

### 5. Update Channel IDs (Optional)

The application will automatically fetch channel IDs from the handles, but you can manually set them for better performance:

1. Get your channel IDs:
   - Visit your channel page
   - View page source and search for "channel_id" or "channelId"
   - Or use the YouTube API to get them programmatically

2. Update the `YOUTUBE_CHANNELS` array in `src/services/youtubeService.ts`

## Features

### Automatic Video Matching
- The system automatically matches recipe titles with YouTube video titles
- Uses fuzzy matching to find relevant videos for each recipe
- Falls back to default demo videos if no API key is provided

### Smart Caching
- Videos are cached for 30 minutes to reduce API calls
- React Query handles automatic background updates
- Graceful fallback when API quota is exceeded

### Channel Integration
- Fetches latest videos from both Hindi and Marathi channels
- Displays channel information with each video
- Direct links to watch videos on YouTube

## Usage

Once set up, the Recipes page will automatically:
1. Fetch the latest videos from your YouTube channels
2. Match videos to recipes based on title similarity
3. Display video thumbnails with play buttons
4. Show channel information for each video

## API Quotas

YouTube Data API v3 has daily quota limits:
- Free tier: 10,000 units per day
- Each search request costs ~100 units
- Consider implementing additional caching if you exceed limits

## Troubleshooting

### No videos showing
1. Check that your API key is correct in the `.env` file
2. Verify the API key has access to YouTube Data API v3
3. Check browser console for error messages
4. Ensure your YouTube channels are public

### API quota exceeded
1. The app will automatically fall back to demo videos
2. Consider reducing the number of videos fetched per channel
3. Implement longer caching periods

### Videos not matching recipes
1. Check that recipe titles are similar to video titles
2. The matching algorithm looks for common words
3. You can customize the matching logic in `useMatchingVideo` hook

## Security Notes

- Keep your API key secret - never commit it to version control
- The `.env` file is already added to `.gitignore`
- Consider using environment-specific keys for development/production
- Restrict your API key to only YouTube Data API v3 for security
