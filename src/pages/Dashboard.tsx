import { useParams } from "react-router-dom"

const Dashboard = () => {
  const id = useParams<{id: string}>().id
  if(!id) return <h1>Please choose service to open it</h1>
  return (
    <div>
      {id}
      Dashboard
    </div>
  )
}

export default Dashboard