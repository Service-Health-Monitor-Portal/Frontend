import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/Login.svg'

const Login = () => {
  useParams<{ id: string }>()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row justify-between h-full py-5 px-10 bg-gradient-to-r from-[#2C427F] to-[#101C49]">
      <div className="flex flex-col gap-5">
        <label className="text-xl md:text-2xl text-white">Email</label>
        <input
          className="text-lg md:text-lg text-white bg-transparent border border-[#E1E1E1] rounded-[10px] h-[38px] w-[267px] p-4 focus:outline-none focus:border-[#E1E1E1]"
          type="email"
          placeholder="Enter Email"
        />

        <label className="text-xl md:text-2xl text-white">Password</label>
        <input
          className="text-lg md:text-lg text-white bg-transparent border border-[#E1E1E1] rounded-[10px] h-[38px] w-[267px] p-4 focus:outline-none focus:border-[#E1E1E1]"
          type="password"
          placeholder="Enter password"
        />

        <button
          className="flex justify-center gap-2 items-center text-[#E1E1E1] bg-gradient-to-r from-[#101C49] to-[#000000] py-2 px-4 rounded-[10px]"
          onClick={() => {
            navigate('/dashboard')
          }}
        >
          <i className="fas fa-check"></i>
          <h1 className="text-lg">Login</h1>
        </button>
      </div>
      <img src={loginImage} alt="login" className="w-full lg:w-3/6 pt-28 px-12" />
    </div>
  )
}
export default Login
