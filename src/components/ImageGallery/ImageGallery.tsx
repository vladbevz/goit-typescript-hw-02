
import ImageCard from "../ImageCard/ImageCard";
import './ImageGallery.css';


interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}


interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

export default function ImageGallery({ images, openModal }: ImageGalleryProps) {
  console.log(images);
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
