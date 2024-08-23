import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/Login.svg'

const Login = () => {
  useParams<{ id: string }>()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row justify-between h-full py-10 px-10 bg-gradient-to-r from-[#2C427F] to-[#101C49]">
      <div className="flex flex-col gap-5">
        <label className="text-xl md:text-2xl text-[#E1E1E1]">Email</label>
        <input
          className="text-lg md:text-lg text-white bg-transparent border border-[#E1E1E1] rounded-[10px] h-[38px] w-[267px] p-4 focus:outline-none focus:border-[#E1E1E1]"
          type="email"
          placeholder="Enter Email"
        />

        <label className="text-xl md:text-2xl text-[#E1E1E1]">Password</label>
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
      <img src={loginImage} alt="login" className="flex justify-end w-full lg:w-4/6 pt-10 pl-20" />
    </div>
  )
}
export default Login
