import React from "react";
import Img from "../assets/img.jpg";

const BlogPost = ({ post, users, onClick }) => {
   const author = users.find((user) => user.id === post.userId);

   return (
      <div className="blogBox" key={post.id} onClick={() => onClick(post)}>
         <img src={Img} alt="Blog" />
         <div className="blog_text">
            <h4 className="title">{post.title}</h4>
            <p>{post.body}</p>
            {author && <p>작성자 : {author.name}</p>}
         </div>
      </div>
   );
};

export default BlogPost;
