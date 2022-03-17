import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="mb-2">
        <div className="searchform">
          <p>Search Product...</p>
          <input
            className="searchtext"
            type="text"
            pattern="[a-zA-Z0-9]+"
            placeholder="Product name..."
            title="Invalid product name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="searchbutton" type="submit">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
