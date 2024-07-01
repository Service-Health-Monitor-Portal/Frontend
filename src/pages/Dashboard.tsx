import { useParams } from 'react-router-dom'
import ChartBox from '../components/Dashboard/ChartBox'

const Dashboard = () => {
  const id = useParams<{ id: string }>().id
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {!id ? <h1 className="text-2xl text-white text-center">Please choose service to open it</h1> : <ChartBox />}
    </div>
  )
}

export default Dashboard
