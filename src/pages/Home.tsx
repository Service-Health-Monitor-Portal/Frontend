import { Button } from '@/components/ui/button'
import { FaChartLine } from 'react-icons/fa'
import { MdOutlineShowChart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import homeImage from '../assets/Home.svg'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between h-full lg:pt-14 pt-1 px-10">
        <div className="flex flex-col gap-5 lg:gap-10 lg:pt-20 pt-4 md:pt-20">
          <h1 className="lg:text-2xl md:text-4xl text-lg " data-testid="heading">
            {' '}
            <span className="text-green-200">W</span>elcome to{' '}
            <span className="text-green-200 inline-block lg:h-12 rotate-[270deg] lg:ml-2 lg:-mb-4 lg:-mr-4 -mr-1 transform scale-x-[-1]">
              <MdOutlineShowChart />
            </span>
            ervice tracker
          </h1>
          <h1 className="lg:text-lg md:text-2xl text-m">
            Monitor your service meticulously to ensure flawless performance
          </h1>
          <div className=" justify-center flex w-full">
            <Button
            variant="secondary"
              className="border rounded-full lg:h-14 lg:w-64 md:h-12 md:w-52 h-10 w-48 border-green-800 dark:border-green-200 lg:text-xl text-lg flex items-center justify-center group mb-10"
              onClick={() => {
                navigate('overview')
              }}
            >
              Join us now
              <span className="ml-4 hidden group-hover:inline-block">
                <FaChartLine />
              </span>
            </Button>
          </div>
        </div>
        <img src={homeImage} alt="home" className="h-screen lg:w-3/6 lg:px-12 " />
      </div>
    </>
  )
}

export default Home
