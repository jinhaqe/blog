import React from "react";
import styled from "styled-components";

const Modalcss = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.6);
   backdrop-filter: blur(5px);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 999;

   & .modal {
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 90%;
      height: 300px;
      max-width: 800px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

   & button {
      border: 0;
      width: 100px;
      height: 30px;
      border-radius: 5px;
      margin-left: 660px;
   }

   & button:hover {
      background-color: rgb(157, 187, 187);
   }
`;

function Modal({ post, users, onClose }) {
   const author = users.find((user) => user.id === post.userId);

   return (
      <Modalcss>
         <div className="modal">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>작성자: {author?.name}</p>
            <button onClick={onClose}>닫기</button>
         </div>
      </Modalcss>
   );
}

export default Modal;
