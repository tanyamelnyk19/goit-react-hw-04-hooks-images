import { Component } from 'react';
import './App.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import imageApi from '../../services/image-api';
import MyLoader from '../MyLoader';
import Modal from '../Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    searchResults: [],
    loader: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages().finally(() => this.setState({ loader: false }));
    }
  }

  fetchImages = () => {
    this.setState({ loader: true });
    return imageApi(this.state.query, this.state.page)
      .then(res => {
        this.setState(prevState => ({
          page: prevState.page + 1,
          searchResults: [...prevState.searchResults, ...res],
        }));
      })
      .catch(err => console.log(err));
  };

  getQuery = value =>
    this.setState({
      query: value,
      page: 1,
      searchResults: [],
    });

  handleButtonLoadMore = () => {
    this.fetchImages()
      .then(() => this.scrollDown())
      .finally(() => this.setState({ loader: false }));
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleImageClick = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  render() {
    const { loader, searchResults, query, showModal, largeImageURL, tags } =
      this.state;
    const { getQuery, handleImageClick, handleButtonLoadMore, toggleModal } =
      this;
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
}

export default App;
