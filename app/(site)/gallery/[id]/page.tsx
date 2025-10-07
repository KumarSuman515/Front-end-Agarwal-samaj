import React from "react";
import AlbumDetail from "@/components/Gallery/AlbumDetail";
import api from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";

interface GalleryPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all gallery albums
export async function generateStaticParams() {
  try {
    const albums = await api.get(API_ENDPOINTS.albums);
    return albums.map((album: any) => ({
      id: album.album_id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for gallery:', error);
    return [];
  }
}

const GalleryPage = async ({ params }: GalleryPageProps) => {
  const resolvedParams = await params;
  const albumId = parseInt(resolvedParams.id);

  if (isNaN(albumId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Invalid Album ID</h1>
          <p className="text-gray-600 dark:text-gray-400">The album ID is not valid.</p>
        </div>
      </div>
    );
  }

  return <AlbumDetail albumId={albumId} />;
};

export default GalleryPage;
