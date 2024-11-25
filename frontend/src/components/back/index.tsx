import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const router = useNavigate();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        router(-1);
      }}
    >
      <ChevronLeft />
    </Button>
  );
};

export default Back;
