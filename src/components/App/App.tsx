import { useEffect, useState } from "react";
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";


interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);  
  const [loading, setLoading] = useState<boolean>(false);  
  const [error, setError] = useState<string>('');  
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleSearch = (newQuery: string): void => {
    setLoading(true);
    setError('');
    setQuery(newQuery);
    setPage(1);
    setLoading(false);  
  };

  const fetchImages = async (query: string, page: number): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=GbvUWLGyLnnd_7J7RShlBhCh-JDGdlUTjgIIiBXjlrE`);
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(prevImages => page === 1 ? data.results : [...prevImages, ...data.results]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);

  const handleLoadMore = (): void => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
  };

  const closeModal = (): void => {
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
