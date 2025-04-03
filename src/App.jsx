import React, { useEffect, useState } from "react";
import "./App.css";
import Img from "./assets/img.jpg";
import search from "./assets/icon.png";

function App() {
   const [blogPosts, setBlogPosts] = useState([]);
   const [users, setUsers] = useState([]);

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
                  <div className="blogBox" key={post.id}>
                     <img src={Img}></img>
                     <div className="blog_text">
                        <h4 className="title">{post.title}</h4>
                        <p>{post.body}</p>
                        {users.map((user) => {
                           if (user.id === post.userId) {
                              return <p key={user.id}>작성자 : {user.name}</p>;
                           }
                           return null; // 일치하지 않으면 아무것도 반환하지 않음
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default App;
