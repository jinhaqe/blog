import React from "react";
import search from "../assets/icon.png";

const SearchBox = () => (
   <div className="searchBox">
      <input type="text" placeholder="검색..." />
      <img src={search} className="search" alt="검색 아이콘" />
   </div>
);

export default SearchBox;
