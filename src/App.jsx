import React, { useEffect, useState } from "react";
import "./App.css";
import BlogPost from "./components/BlogPost";
import Modal from "./components/Modal";
import SearchBox from "./components/SearchBox";

function App() {
   const [blogPosts, setBlogPosts] = useState([]);
   const [users, setUsers] = useState([]);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedPost, setSelectedPost] = useState(null);

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((response) => response.json())
         .then((data) => {
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

   const openDialog = (post) => {
      setSelectedPost(post);
      setIsDialogOpen(true);
   };

   const closeDialog = () => {
      setIsDialogOpen(false);
      setSelectedPost(null);
   };

   return (
      <div className="body">
         <div className="container">
            <div className="header">
               <h2>Blog</h2>
               <SearchBox /> {/* SearchBox 컴포넌트 */}
            </div>
            <hr />
            <div className="BlogInfo">
               {blogPosts.map((post) => (
                  <BlogPost
                     key={post.id}
                     post={post}
                     users={users}
                     onClick={openDialog} // BlogPost 클릭 시 모달 열기
                  />
               ))}
            </div>

            {/* 모달 영역 */}
            {isDialogOpen && selectedPost && (
               <Modal
                  post={selectedPost}
                  users={users}
                  onClose={closeDialog} // 모달 닫기
               />
            )}
         </div>
      </div>
   );
}

export default App;
