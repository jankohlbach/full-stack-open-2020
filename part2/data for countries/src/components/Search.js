import React from 'react';

const Search = (props) => (
  <div>
    find countries <input value={props.search} onChange={props.handleSearchChange} />
  </div>
);

export default Search;
