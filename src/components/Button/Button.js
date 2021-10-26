import './Button.css';
import PropTypes from 'prop-types';

export default function Button({ handleButtonLoadMore }) {
  return (
    <button type="button" className="button" onClick={handleButtonLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleButtonLoadMore: PropTypes.func,
};
