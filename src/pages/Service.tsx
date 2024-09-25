import { useParams } from 'react-router-dom'
import ServiceData from '../components/Dashboard/ServiceData'
import Loader from '../components/Loader'
import useCustomQuery from '../hooks/useCustomQuery'

const Dashboard = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useCustomQuery({
    queryKey: [`services/${id}`],
    url: `services/${id}`,
    enabled: !!id,
    config: { headers: { 'ngrok-skip-browser-warning': '1',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     } },
  })

  if (!id)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
        <div className="text-xl font-semibold">Please choose service to open it</div>
      </div>
    )

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
        <Loader />
      </div>
    )

  return (
    <div className="flex flex-col w-full h-full overflow-auto p-5">
      <h1 className="text-xl font-semibold">Service: {data.name}</h1>
      <ServiceData id={id} />
    </div>
  )
}

export default Dashboard
