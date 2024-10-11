

interface ImageUrls {
  small: string;
}

interface Image {
  urls: ImageUrls;
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
}
