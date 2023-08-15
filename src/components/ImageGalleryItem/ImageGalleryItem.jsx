import { React, Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <li
        onClick={() => this.props.onClick(largeImageURL, tags)}
        className="ImageGalleryItem"
      >
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}
