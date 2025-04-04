import React, { useEffect, useState } from "react";
import "./App.css";
import BlogPost from "./components/BlogPost";
import Modal from "./components/Modal";
import SearchBox from "./components/SearchBox";

function App() {
   const [users, setUsers] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 상태
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedPost, setSelectedPost] = useState(null);
   const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

   useEffect(() => {
      const fetchData = async () => {
         try {
            // 1. 사용자 목록을 먼저 가져옵니다.
            const usersResponse = await fetch(
               "https://jsonplaceholder.typicode.com/users"
            );
            const usersData = await usersResponse.json();
            setUsers(usersData); // 사용자 데이터 저장

            let postsUrl = "https://jsonplaceholder.typicode.com/posts";

            // 2. 검색어가 숫자일 경우 userId로 API 요청
            if (searchTerm && !isNaN(searchTerm)) {
               postsUrl += `?userId=${searchTerm}`; // userId로 필터링
            } else if (searchTerm) {
               // 3. 검색어가 이름일 경우 해당 사용자의 userId를 찾아서 API 요청
               const user = usersData.find((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
               );

               if (user) {
                  postsUrl += `?userId=${user.id}`; // 이름으로 찾은 userId로 필터링
               }
            }

            // 4. 필터링된 URL로 게시글을 가져옵니다.
            const postsResponse = await fetch(postsUrl);
            const postsData = await postsResponse.json();
            setFilteredPosts(postsData); // 필터링된 게시글 데이터 저장
         } catch (error) {
            console.error("데이터 가져오기 실패:", error);
         }
      };

      fetchData(); // 데이터 fetching 함수 실행
   }, [searchTerm]); // searchTerm이 변경될 때마다 데이터 다시 가져오기

   const openDialog = (post) => {
      // 모달창 열리게 하는 함수
      setSelectedPost(post); // 현재 포스트 값 전달
      setIsDialogOpen(true); // 모달창의 상태 변경
   };

   const closeDialog = () => {
      setIsDialogOpen(false); // 모달창 상태 변경
      setSelectedPost(null); // 현재 포스트 값 초기화
   };

   // 검색 시 호출되는 함수
   const handleSearch = (value) => {
      setSearchTerm(value); // 검색어 상태 업데이트
   };

   // const handleSearch = (query) => {
   //    if (!query) {
   //       setFilteredPosts(blogPosts);
   //       return;
   //    }

   //    const filteredUsers = users.filter((user) =>
   //       user.name.toLowerCase().includes(query.toLowerCase())
   //    );
   //    const filteredUserIds = filteredUsers.map((user) => user.id);

   //    const filtered = blogPosts.filter((post) =>
   //       filteredUserIds.includes(post.userId)
   //    );
   //    setFilteredPosts(filtered);
   // };

   return (
      <div className="body">
         <div className="container">
            <div className="header">
               <h2>Blog</h2>
               <SearchBox onSearch={handleSearch} />
               {/* 해당 컴포넌트에 함수 전달 */}
            </div>
            <hr />
            <div className="BlogInfo">
               {filteredPosts.map((post) => (
                  <BlogPost
                     key={post.id}
                     post={post}
                     users={users}
                     onClick={openDialog} // 모달창의 열림 상태를 저장하는 함수
                  />
               ))}
            </div>

            {/* 모달 영역 */}
            {isDialogOpen && selectedPost && (
               <Modal post={selectedPost} users={users} onClose={closeDialog} />
            )}
         </div>
      </div>
   );
}

export default App;
