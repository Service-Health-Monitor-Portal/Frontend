import { useNavigate } from "react-router-dom";

interface IProps {}

const Home = ({}: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen" >
      Home
      <button
        className="border border-blue-500 p-2 mt-2"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Home;
