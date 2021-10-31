import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import imageApi from '../../services/image-api';
import MyLoader from '../MyLoader';
import Modal from '../Modal';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = () => {
      setLoader(true);
      return imageApi(query, page)
        .then(res => {
          setSearchResults(prevSearchResults => [...prevSearchResults, ...res]);
          if (page !== 1) {
            scrollDown();
          }
        })
        .catch(err => console.log(err));
    };
    fetchImages().finally(() => setLoader(false));
  }, [query, page]);

  const getQuery = value => {
    setQuery(value);
    setPage(1);
    setSearchResults([]);
  };

  const handleButtonLoadMore = () => {
    setLoader(true);
    setPage(prevPage => prevPage + 1);
    setLoader(false);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImageClick = img => {
    setLargeImageURL(img.largeImageURL);
    setTags(img.tags);
    toggleModal();
  };

  return (
    <div className="App">
      <Searchbar getQuery={getQuery} />
      {searchResults.length > 0 ? (
        <ImageGallery
          searchResults={searchResults}
          handleImageClick={handleImageClick}
        />
      ) : (
        query !== '' && !loader && <p className="noResult">No results😟</p>
      )}
      {searchResults.length > 0 && !loader && (
        <Button handleButtonLoadMore={handleButtonLoadMore} />
      )}
      {loader && <MyLoader />}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </div>
  );
}

export default App;
