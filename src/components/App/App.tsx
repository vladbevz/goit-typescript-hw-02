import { useEffect, useState } from "react";
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

interface ImageUrls {
  small: string;
  regular: string;
}

interface Image {
  id: string;
  urls: ImageUrls;
  alt_description: string;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery: string) => {
    setLoading(true);
    setError('');
    setQuery(newQuery);
    setPage(1);
    setLoading(false);  
  };

  const fetchImages = async (query: string, page: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=GbvUWLGyLnnd_7J7RShlBhCh-JDGdlUTjgIIiBXjlrE`);
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(prevImages => page === 1 ? data.results : [...prevImages, ...data.results]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error ? <ErrorMessage /> : (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {loading && <Loader />}
          <ImageModal 
            image={selectedImage} 
            isOpen={!!selectedImage} 
            onClose={closeModal} 
          />
          {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
    </>
  );
}
