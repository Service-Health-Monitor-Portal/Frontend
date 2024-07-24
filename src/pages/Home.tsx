import { useNavigate } from 'react-router-dom'
import homeImage from '../assets/Home.svg'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row justify-between h-full py-5 px-10">
      <div className="flex flex-col gap-5 lg:gap-10">
        <h1 className="text-2xl md:text-4xl text-white">Welcome to service tracker</h1>
        <h1 className="text-lg md:text-2xl text-white">
          Monitor your service meticulously to ensure
          flawless performance
        </h1>
        <button
          className="border border-[#E1E1E1] rounded-[30px] text-[#E1E1E1] h-[55px] w-[235px] p-2 mt-2  hover:text-green-400"
          onClick={() => {
            navigate('/dashboard')
          }}
        >
          <h1 className="text-lg">Join us now </h1>
        </button>
      </div>
      <img src={homeImage} alt="home" className="w-full lg:w-3/6 pt-28 px-12" />
    </div>
  )
}

export default Home
