import React, { useState, useRef } from "react";
import search from "../assets/icon.png";
import styled from "styled-components";

const Img = styled.img`
   cursor: pointer;
`;

const Search_Box = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;

   & .search {
      width: 24px;
      height: 24px;
      margin-right: 30px;
   }
`;

function SearchBox({ onSearch }) {
   const [userInput, setUserInput] = useState("");
   const searchRef = useRef("");

   const handleChange = (e) => {
      setUserInput(e.target.value);
   };

   // img 클릭 시 검색 호출
   const handleSearchClick = () => {
      searchRef.current.focus();
      onSearch(userInput); // 이미지 클릭 시 검색
   };

   return (
      <Search_Box>
         <input
            type="text"
            placeholder="검색..."
            ref={searchRef}
            value={userInput}
            onChange={handleChange}
         />
         <Img
            src={search}
            className="search"
            alt="검색 아이콘"
            onClick={handleSearchClick} // 클릭 시 onSearch 호출
         />
      </Search_Box>
   );
}

export default SearchBox;
