import { useNavigate } from 'react-router-dom'
import homeImage from '../assets/Home.svg'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#101C49] to-[#000000] px-4">
      <Navbar />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-5 px-10">
          <h1 className="text-3xl text-white">Welcome to service tracker</h1>
          <h1 className="text-2xl text-white">
            Monitor your service meticulously to ensure
            <br />
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
        <img src={homeImage} alt="home" className="w-3/6 pt-28 px-12" />
      </div>
    </div>
  )
}

export default Home
