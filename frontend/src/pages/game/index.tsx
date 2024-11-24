import Navbar from "@/components/navbar";

const GamePage = () => {
  return (
    <div className="w-full">
      <Navbar />

      <div className="w-[900px] flex items-center justify-center flex-col mx-auto my-3">
        <img
          src="https://github.com/adedoyin-emmanuel.png"
          alt="My Github image"
          className="rounded-full"
          width={300}
          height={300}
              />
              
              
      </div>
    </div>
  );
};

export default GamePage;
