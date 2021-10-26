import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ img, handleImageClick }) {
  return (
    <li key={img.id} className="ImageGalleryItem">
      <img
        src={img.webformatURL}
        alt={img.tags}
        width="300"
        className="ImageGalleryItem-image"
        onClick={() => handleImageClick(img)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
  handleImageClick: PropTypes.func,
};
