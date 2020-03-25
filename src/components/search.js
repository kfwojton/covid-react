import React from 'react'

const Search = ({ onChange }) => (
  <input
    type="text"
    onChange={onChange}
    placeholder="Enter County..."
    autoFocus
    name="search"
  />
)

export default Search
