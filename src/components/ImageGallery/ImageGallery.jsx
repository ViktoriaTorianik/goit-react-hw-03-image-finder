import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export class ImageGallery extends Component {
  render() {
    const hits = this.props.hits;
    return (
      <div>
        <ul className="ImageGallery">
          {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                onClick={this.props.onClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
