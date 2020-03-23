import React from 'react'

const Search = ({ onChange }) => (
  <input
    type="text"
    onChange={onChange}
    placeholder="Enter Location (State/Country)..."
    autoFocus
    name="search"
  />
)

export default Search
