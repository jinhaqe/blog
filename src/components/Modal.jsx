import React from "react";

function Modal({ post, users, onClose }) {
   const author = users.find((user) => user.id === post.userId);

   return (
      <div className="modalBackdrop">
         <div className="modal">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>작성자: {author?.name}</p>
            <button onClick={onClose}>닫기</button>
         </div>
      </div>
   );
}

export default Modal;
