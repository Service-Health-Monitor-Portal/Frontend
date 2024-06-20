import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#101C49] to-[#000000] " >
      Home
      <button
        className="border #FFFFFF p-2 mt-2" style={{ border: '0.5 px solid #E1E1E1', borderRadius: '30px', color: '#E1E1E1',height:'59px',width: '235px'}}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Join us now
      </button>
    </div>
  );
};

export default Home;
