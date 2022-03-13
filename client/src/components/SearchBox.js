import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHome } from "react-icons/fa";
import { RiHealthBookLine } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import "./searchbox.css";

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
