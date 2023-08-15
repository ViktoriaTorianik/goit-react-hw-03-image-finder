import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal_root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.heandleKayDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.heandleKayDown);
  }
  heandleKayDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClick();
    }
  };
  headleBeackDrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClick();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.headleBeackDrop}>
        <div className="Modal">
          <img
            src={this.props.src}
            alt={this.props}
            onClick={this.props.onClick}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
