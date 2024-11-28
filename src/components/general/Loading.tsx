import React from "react";

interface LoadingProps {
  message?: string;
}
const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="justify-center items-center h-full">
      <div>
        <div className="loader"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loading;
