import ImageCard from "../ImageCard/ImageCard";
import './ImageGallery.css';

interface ImageUrls {
  small: string;
  regular: string;
}

interface Image {
  id: string;
  urls: ImageUrls;
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

export default function ImageGallery({ images, openModal }: ImageGalleryProps) {
  return (
    <>
      <ul className='imagegallery'>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} onClick={() => openModal(image)} />
          </li>
        ))}
      </ul>
    </>
  );
}
