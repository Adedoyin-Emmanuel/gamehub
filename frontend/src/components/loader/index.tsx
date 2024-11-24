import React from "react";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({isLoading}: LoaderProps) => {
  return (
    <div>
      <h1>Loader works!</h1>
    </div>
  );
};

export default Loader;
