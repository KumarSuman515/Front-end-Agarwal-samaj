export interface GalleryAlbum {
  album_id: number;
  album_title: string;
  album_description: string;
  cover_image_url: string | null;
  event_date: string;
  createdAt: string;
  updatedAt: string;
  GalleryImages?: GalleryImage[];
}

export interface GalleryImage {
  image_id: number;
  album_id: number;
  image_url: string;
  caption: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlbumData {
  album_title: string;
  album_description: string;
  event_date: string;
  cover_image?: File;
}

export interface AddImagesData {
  images: File[];
  caption?: string;
}
