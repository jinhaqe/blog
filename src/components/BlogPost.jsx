import React from "react";
import Img from "../assets/img.jpg";
import styled from "styled-components";

const BlogBox = styled.div`
   width: 300px;
   height: 400px;
   background-color: rgb(77, 140, 177);
   margin: 10px;
   border: 1px solid #ddd;
   border-radius: 10px;
   padding: 20px;
   background-color: #f9f9f9;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s ease, background-color 0.3s ease;
   cursor: pointer;

   &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      background-color: rgb(157, 187, 187);
   }

   & img div {
      width: 100%;
      height: 50%;
      text-align: center;
   }

   & img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      border-radius: 8px; /* 이미지의 모서리도 둥글게 */
   }

   & .blog_text {
      height: 50%;
      padding: 20px 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
   }

   & .blog_text .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: block;
      text-align: left;
   }

   & .blog_text p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      font-size: 14px;
      width: 100%;
      text-align: left;
   }
`;

const BlogPost = ({ post, users, onClick }) => {
   const author = users.find((user) => user.id === post.userId);

   return (
      <BlogBox key={post.id} onClick={() => onClick(post)}>
         <img src={Img} alt="Blog" />
         <div className="blog_text">
            <h4 className="title">{post.title}</h4>
            <p>{post.body}</p>
            {author && <p>작성자 : {author.name}</p>}
         </div>
      </BlogBox>
   );
};

export default BlogPost;
