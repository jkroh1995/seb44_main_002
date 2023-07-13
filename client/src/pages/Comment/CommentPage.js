import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export default function CommentPage() {
  const [isCommented, setIsCommented] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    CommentValid(comment, setIsValid);
  };

  return (
    <div className="relative bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-100% pt-[5rem] flex flex-col  items-center ">
      <button onClick={() => navigate('/')}>
        <img
          src="/images/logo.webp"
          alt="로고"
          className="w-[30px] mb-[2rem] "
        />
      </button>

      <section className="w-[520px] h-[520px] rounded-2xl bg-[#000000]/40 mb-[10rem] flex flex-col items-center">
        <h1 className="mt-[30px] text-gray-200 font-bold text-[20px] mb-[2rem]">
          댓글 수정
        </h1>
        <div>
          <InputTextArea
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e.target.value)}
            className={
              !isValid
                ? 'border-red-500 border-[1px]'
                : 'border border-solid border-gray-200 w-[400px] h-[200px] mb-[2rem]'
            }
          />
          {!isValid && (
            <p className="text-red-500">1~200자 범위내로 작성해주세요</p>
          )}
        </div>
        <InputButton onClick={handleSubmit}>전송하기</InputButton>
      </section>
    </div>
  );
}
const InputTextArea = tw.textarea`
h-24 
w-full
bg-transparent 
`;
const InputButton = tw.button`
h-8 
w-20 
ml-6
pb-0.5 
border-[1px] 
border-gray-400
rounded-md  
inline-block 
text-gray-400
hover:text-pointPurple-100
hover:border-pointPurple-100
max-md:mt-4
`;
