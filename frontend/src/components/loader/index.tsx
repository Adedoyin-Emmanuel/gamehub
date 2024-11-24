import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";

interface LoaderProps {
  isLoading: boolean;
  size?: number;
}

export const Loader = ({ isLoading, size = 27 }: LoaderProps) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[1000] bg-black/40  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
      ></div>
      <div className="w-screen h-screen flex items-center justify-center fixed ">
        <ClipLoader loading={isLoading} color="#5A83ED" size={size} />
      </div>
    </>
  );
};
export default Loader;
