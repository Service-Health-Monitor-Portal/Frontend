import { useParams } from 'react-router-dom'
import ChartBox from '../components/Dashboard/ChartBox'
import useCustomQuery from '../hooks/useCustomQuery'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const id = useParams<{ id: string }>().id ?? ''
  const [pieSeries, setPieSeries] = useState<any[]>([])
  const [pieOptions, setPieOptions] = useState<any>({
    labels: [],
    legend: {
      show: true,
      position: 'right',
    },
    colors: ["#00AB55", "#2D99FF", "#FFE700", "#826AF9"],
    theme: {
      mode: 'dark',
    },
  })
  const { data, isLoading } = useCustomQuery({
    queryKey: ['services', id],
    url: `services/${id}`,
  })
  useEffect(() => {
    if (data) {
      const newPieSeries = [];
      for (const key in data) {
        let sum = 0;
        for (const key2 of data[key]) {
          sum += key2.rate;
        }
        newPieSeries.push(sum);
      }
      setPieSeries(newPieSeries);
  
      setPieOptions({
        ...pieOptions,
        labels: Object.keys(data),
      });
    }
  }, [data]);
  console.log(data);
  
  
  console.log(pieSeries);
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {!id ? (
        <h1 className="text-2xl text-white text-center">Please choose service to open it</h1>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <ChartBox  options={pieOptions} series={pieSeries} type="pie" width="500" />
      )}
    </div>
  )
}

export default Dashboard
