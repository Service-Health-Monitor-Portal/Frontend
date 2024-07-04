import { useParams } from 'react-router-dom'
import ChartBox from '../components/Dashboard/ChartBox'
import useCustomQuery from '../hooks/useCustomQuery'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const id = useParams<{ id: string }>().id ?? ''
  const [refetchInterval, setRefetchInterval] = useState<number>(60000)
  const [availabilityLineSeries, setAvailabilityLineSeries] = useState<any[]>([])
  const [availabilityLineOptions, setAvailabilityLineOptions] = useState<any>({
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Availability',
      align: 'left',
    },
    xaxis: {
      categories: [],
    },
    theme: {
      mode: 'dark',
    },
  })
  const [pieSeries, setPieSeries] = useState<any[]>([])
  const [pieOptions, setPieOptions] = useState<any>({
    labels: [],
    legend: {
      show: true,
      position: 'right',
    },
    colors: ['#00AB55', '#2D99FF', '#FFE700', '#826AF9'],
    theme: {
      mode: 'dark',
    },
  })
  const { data, isLoading } = useCustomQuery({
    queryKey: ['services', id],
    url: `services/${id}`,
    pollInterval: refetchInterval,
  })
  useEffect(() => {
    if (data) {
      const newPieSeries = []
      const newAvailabilityLineSeries: any = {}
      console.log('data: ', data)
      for (const key in data) {
        let sum = 0
        for (const key2 of data[key]) {
          sum += key2.rate
          if (newAvailabilityLineSeries[key2.time]) {
            newAvailabilityLineSeries[key2.time].push({ rate: key2.rate, type: key })
          } else {
            newAvailabilityLineSeries[key2.time] = [{ rate: key2.rate, type: key }]
          }
        }
        newPieSeries.push(sum)
      }
      setPieSeries(newPieSeries)
      const times = Object.keys(newAvailabilityLineSeries)
      console.log('times', times)
      const availabilityLineSeries = times.map((time) => {
        const rateSuccess = newAvailabilityLineSeries[time].find((item: any) => item.type === 'success').rate
        const rateDependencyError = newAvailabilityLineSeries[time].find(
          (item: any) => item.type === 'dependencyError'
        ).rate
        const rateFaultError = newAvailabilityLineSeries[time].find((item: any) => item.type === 'faultError').rate
        return rateSuccess - rateDependencyError - rateFaultError
      })
      const categories = times.map((time) => {
        return new Date(time).toLocaleTimeString()
      })
      console.log('categories', categories)
      setAvailabilityLineOptions({
        ...availabilityLineOptions,
        xaxis: {
          categories,
        },
      })
      console.log('availabilityLineSeries', availabilityLineSeries)
      setAvailabilityLineSeries([{ name: 'Availability', data: availabilityLineSeries }])
      setPieOptions({
        ...pieOptions,
        labels: Object.keys(data),
      })
    }
  }, [data])
  console.log(data)

  console.log(pieSeries)
  return (
    <div className="flex flex-col w-full h-full items-center justify-center relative">
      {!id ? (
        <h1 className="text-2xl text-white text-center">Please choose service to open it</h1>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select className="absolute top-4 right-4 h-10 bg-gray-800 text-white" onChange={(e) => setRefetchInterval(Number(e.target.value))}>
            <option value="60000">1 minute</option>
            <option value="300000">5 minutes</option>
            <option value="600000">10 minutes</option>
            <option value="900000">15 minutes</option>
            <option value="1800000">30 minutes</option>
          </select>
          <div className="flex flex-col 2xl:flex-row gap-3">
            <ChartBox options={pieOptions} series={pieSeries} type="pie" width="500" />
            <ChartBox options={availabilityLineOptions} series={availabilityLineSeries} type="line" width="500" />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
