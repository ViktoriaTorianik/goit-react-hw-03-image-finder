import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Dna from './Loader/Loader';

import * as ImageService from 'service/getApi';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    lastPage: true,
    isloading: false,
    showModal: false,
    src: null,
    alt: null,
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
      if (hits.length === 0) {
        toast.warn('По цьому запиту нфчого не знайдено', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
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
    this.setState({ query, page: 1, hits: [] });
  };
  handlLoadeMore = e => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  handleImageClick = (largeImageURL, tags) => {
    this.setState({ src: largeImageURL, alt: tags, showModal: true });
  };
  handlModalClose = () => {
    this.setState({ showModal: false });
  };
  handleClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  render() {
    const { hits, lastPage, isloading, alt, src, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isloading && <Dna />}

        <ImageGallery hits={hits} onClick={this.handleImageClick} />
        {!lastPage && <Button onClick={this.handleClick} />}
        {showModal && (
          <Modal onClick={this.handlModalClose} src={src} tags={alt} />
        )}

        <ToastContainer position="top-center" theme="dark" />
      </div>
    );
  }
}
