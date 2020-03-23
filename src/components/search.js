import React from 'react'

const Search = ({ onChange }) => (
  <input
    type="text"
    onChange={onChange}
    placeholder="Enter Mission Name..."
    autoFocus
    name="search"
  />
)

export default Search
