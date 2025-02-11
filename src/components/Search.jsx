import React, { useState } from 'react'

function Search({ handleSearch }) {

    return (
        <div className="search-form shadow rounded mt-5 text-center w-50 m-auto p-3">
            <h3>Search product</h3>
            <input onChange={(e) => handleSearch(e.target.value)} type="text" id="search-input" className="form-control mb-2" name="title"
                placeholder="Enter Product title" />
                {/* <button className="btn btn-success mt-2 me-2" id="search-btn">Search</button>
                <button className="btn btn-success mt-2" id="reset-btn">Reset</button> */}
        </div>
    )
}

export default Search
