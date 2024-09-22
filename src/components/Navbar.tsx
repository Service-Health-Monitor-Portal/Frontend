import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : null;

  console.log(user)
  console.log(user?.name.split(" "))
  const name = user?.name.split(" ");
  const email = user?.email;
  const userFallBack = name ? (name[0][0] + name[1][0]) : ""

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleGetstarted = () => {
    navigate("login")
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex px-10 py-1 w-full justify-between items-center'>
        <img
          src={logo}
          alt="logo"
          className="h-12"
          data-testid="logo"
          onClick={() => {
            navigate('/')
          }}
        />
        <div className='flex gap-2 items-center'>
          <ModeToggle />
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>{userFallBack}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) :
              <Button onClick={handleGetstarted}>
                Get Started
              </Button>
          }
        </div>
      </div>
      <div className='-mx-1 my-1 h-px bg-muted w-full'></div>
    </div>
  )
}

export default Navbar

/**/