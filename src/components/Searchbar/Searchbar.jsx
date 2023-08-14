import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value.trim().toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warn('що шукаємо?', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
