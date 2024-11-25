import { ClipLoader } from "react-spinners";

interface LoaderProps {
  isLoading: boolean;
  size?: number;
  color?: string;
}

export const Loader = ({
  isLoading,
  size = 27,
  color = "#000",
}: LoaderProps) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <ClipLoader loading={isLoading} color={color} size={size} />
      </div>
    </>
  );
};
export default Loader;
