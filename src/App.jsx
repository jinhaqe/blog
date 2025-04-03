import React, { useEffect, useState } from "react";
import "./App.css";
import Img from "./assets/img.jpg";
import search from "./assets/icon.png";

function App() {
   const [blogPosts, setBlogPosts] = useState([]);
   const [users, setUsers] = useState([]);
   const [isDialogOpen, setIsDialogOpen] = useState(false); // 모달 상태 관리
   const [selectedPost, setSelectedPost] = useState(null); // 선택된 포스트

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setBlogPosts(data);
         })
         .catch((error) => console.error("데이터 가져오기 실패:", error));

      fetch("https://jsonplaceholder.typicode.com/users")
         .then((response) => response.json())
         .then((data) => {
            setUsers(data);
         })
         .catch((error) =>
            console.error("사용자 데이터 가져오기 실패:", error)
         );
   }, []);

   // 모달 열기
   const openDialog = (post) => {
      setSelectedPost(post); // 선택한 포스트 저장
      setIsDialogOpen(true); // 모달 열기
   };

   // 모달 닫기
   const closeDialog = () => {
      setIsDialogOpen(false); // 모달 닫기
      setSelectedPost(null); // 선택된 포스트 초기화
   };

   return (
      <div className="body">
         <div className="container">
            <div className="header">
               <h2>Blog</h2>
               <div className="searchBox">
                  <input type="text" placeholder="검색..." />
                  <img src={search} className="search" />
               </div>
            </div>
            <hr />
            <div className="BlogInfo">
               {blogPosts.map((post) => (
                  <div
                     className="blogBox"
                     key={post.id}
                     onClick={() => openDialog(post)} // 카드 클릭 시 모달 열기
                  >
                     <img src={Img} alt="Blog" />
                     <div className="blog_text">
                        <h4 className="title">{post.title}</h4>
                        <p>{post.body}</p>
                        {users.map((user) => {
                           if (user.id === post.userId) {
                              return <p key={user.id}>작성자 : {user.name}</p>;
                           }
                           return null;
                        })}
                     </div>
                  </div>
               ))}
            </div>

            {/* 모달 (중앙에 표시) */}
            <dialog open={isDialogOpen} onClose={closeDialog} className="modal">
               {selectedPost && (
                  <div>
                     <h3>{selectedPost.title}</h3>
                     <p>{selectedPost.body}</p>
                     <p>
                        작성자:{" "}
                        {
                           users.find((user) => user.id === selectedPost.userId)
                              ?.name
                        }
                     </p>
                     <button onClick={closeDialog}>닫기</button>
                  </div>
               )}
            </dialog>
         </div>
      </div>
   );
}

export default App;
