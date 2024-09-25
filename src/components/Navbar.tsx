import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
      <div className='flex px-10 py-1 w-full justify-between items-center'>

        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <img
            src={logo}
            alt="logo"
            className="h-12"
            data-testid="logo"
            onClick={() => {
              navigate('/')
            }}
          />
          <Link
            to="/overview"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            Overview
          </Link>
          <Link
            to="/services"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <img
                src={logo}
                alt="logo"
                className="h-12"
                data-testid="logo"
                onClick={() => {
                  navigate('/')
                }}
              />
              <Link
                to="/overview"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                Overview
              </Link>
              <Link
                to="/services"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Services
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
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
                <DropdownMenuContent className='w-40 absolute right-0'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col'>
                    <h1>{user?.name}</h1>
                    <h1 className='text-[11px] text-muted-foreground'>{email}</h1>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
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
    </header>
  )
}

export default Navbar