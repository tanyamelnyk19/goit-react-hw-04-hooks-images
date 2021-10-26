import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ searchResults, handleImageClick }) {
  return (
    <ul className="ImageGallery">
      {searchResults.map(img => {
        return (
          <ImageGalleryItem
            img={img}
            key={img.id}
            handleImageClick={handleImageClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  searchResults: PropTypes.array.isRequired,
  handleImageClick: PropTypes.func,
};
