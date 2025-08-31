'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onImageRemove: (index: number) => void;
  images: string[];
}

export function ImageUploader({
  onImageUpload,
  onImageRemove,
  images,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // In a real implementation, you would upload to Cloudinary or another service
    // For now, we'll simulate the upload with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate uploaded image URL
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset the input to allow uploading the same file again
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-32 h-32 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}

        <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-md">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center cursor-pointer text-muted-foreground"
          >
            {isUploading ? (
              <Icons.spinner className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs mt-1">Add Image</span>
              </>
            )}
          </label>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Upload high-quality images of your property. First image will be used as
        the cover photo.
      </p>
    </div>
  );
}
