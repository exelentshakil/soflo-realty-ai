/**
 * Auto-generated Media Assets from Pexels API
 * Project: soflo-realty-ai
 * Seeded with high-fidelity Miami waterfront luxury real estate media.
 * Zero attribution clutter on UI (Enterprise Clean Standard)
 */

export interface PhotoAsset {
  id: string;
  url: string;
  alt: string;
  avg_color: string;
}

export interface VideoAsset {
  id: string;
  videoUrl: string;
  posterUrl: string;
  width: number;
  height: number;
}

export interface MediaConfig {
  caseStudyPhoto: PhotoAsset;
  editorialPhotos: PhotoAsset[];
  ambientVideo: VideoAsset;
}

export const mediaConfig: MediaConfig = {
  caseStudyPhoto: {
    "id": "323780",
    "url": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "alt": "Stunning modern luxury villa with a clean swimming pool and outdoor lounge.",
    "avg_color": "#CECFCE"
  },
  editorialPhotos: [
    {
      "id": "7031408",
      "url": "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "alt": "Luxury modern living room with floor to ceiling glass overlooking the ocean.",
      "avg_color": "#A1A2AA"
    },
    {
      "id": "1454806",
      "url": "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "alt": "High-end penthouse bedroom opening onto a private ocean balcony with panoramic views.",
      "avg_color": "#B7AEB9"
    },
    {
      "id": "1105754",
      "url": "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "alt": "Beautiful geometric architectural details of a luxury high-rise condominium.",
      "avg_color": "#BCC8DA"
    }
  ],
  ambientVideo: {
    "id": "15768227",
    "videoUrl": "https://videos.pexels.com/video-files/15768227/15768227-uhd_4096_2160_24fps.mp4",
    "posterUrl": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    "width": 4096,
    "height": 2160
  }
};

