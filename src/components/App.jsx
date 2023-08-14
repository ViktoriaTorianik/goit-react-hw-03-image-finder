import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
import * as ImageService from 'service/getApi';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    total: 100,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query === this.state.query || prevState.query === '') {
      return;
    }
    const { hits, total } = await ImageService.getApi({
      page: this.state.page,
      query: this.state.query,
    });
    this.setState(prev => ({
      hits: [...prev.hits, hits],
    }));
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ToastContainer position="top-center" theme="dark" />
      </div>
    );
  }
}
