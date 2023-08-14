import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import Dna from './Loader/Loader';

// import ImageGallery from './ImageGallery/ImageGallery';
import * as ImageService from 'service/getApi';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    lastPage: true,
    isloading: false,
  };
  getNormalazedImages = arrey =>
    arrey.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.query === this.state.query &&
        prevState.page === this.state.page) ||
      this.state.query.trim() === ''
    ) {
      return;
    }
    this.setState({ isloading: true });
    try {
      const { hits, total } = await ImageService.getApi({
        page: this.state.page,
        query: this.state.query,
      });
      this.setState(prev => ({
        hits: [...prev.hits, ...this.getNormalazedImages(hits)],
        lastPage: this.state.page >= Math.ceil(total / 12),
      }));
    } catch (error) {
      console.log('Error');
    } finally {
      this.setState({ isloading: false });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };
  handlLoadeMore = e => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  render() {
    const { hits, lastPage, isloading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isloading && <Dna />}
        {hits.length !== 0 && (
          <ul class="gallery">
            {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <li class="gallery-item" key={id}>
                  <img src={webformatURL} alt={tags} />
                </li>
              );
            })}
          </ul>
        )}
        {!lastPage && <button onClick={this.handlLoadeMore}>Loade more</button>}
        <ToastContainer position="top-center" theme="dark" />
      </div>
    );
  }
}
