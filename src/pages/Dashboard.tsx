import { useParams } from "react-router-dom"
import ChartBox from "../components/Dashboard/ChartBox"

const Dashboard = () => {
  const id = useParams<{id: string}>().id
  if(!id) return <h1>Please choose service to open it</h1>
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gradient-to-br from-[#3A5491] to-[#182655] text-white">
      {id}
      Dashboard
      <ChartBox />
    </div>
  )
}

export default Dashboard