import React, { Component } from "react";

class SearchBox extends Component {
  state = {};
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        className="form-control mb-4"
        value={value}
        onChange={onChange}
        type="text"
        name="search"
        placeholder="Search..."
      />
    );
  }
}

export default SearchBox;
