import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  return <img
        src={logo}
        alt="logo"
        className="mx-12 mt-10 md:w-2/12 lg:w-1/12 w-1/4"
        data-testid="logo"
        onClick={() => {
          navigate('/')
        }}
      />
  // <div className="px-10 py-5 font-semibold text-xl leading-[30px] text-white">Service tracker</div>
}

export default Navbar
