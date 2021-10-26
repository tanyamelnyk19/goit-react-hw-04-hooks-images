import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleModalClose = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleModalClose}>
        <div className="Modal">{this.props.children}</div>
        {/* <img src="" alt="" /> */}
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  children: PropTypes.node,
};
