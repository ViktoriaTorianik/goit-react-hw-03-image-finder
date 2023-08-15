import { React, Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick} className="Button">
        Load more
      </button>
    );
  }
}
