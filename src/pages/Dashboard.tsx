import { useParams } from 'react-router-dom'
import ChartBox from '../components/Dashboard/ChartBox'
import useCustomQuery from '../hooks/useCustomQuery'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { id } = useParams<{ id: string }>()
  const logTypes = ['success', 'dependencyError', 'faultError', 'throttlingError', 'invalidInputError']
  const [refetchInterval, setRefetchInterval] = useState<number>(30000)
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
    yaxis: {
      title: {
        text: 'Availability',
      },
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0) + '%'
        },
      },
      min: 0,
      max: 100,
    },
    theme: {
      mode: 'dark',
    },
  })

  const [pieSeries, setPieSeries] = useState<any[]>([])
  const pieOptions = {
    labels: logTypes,
    legend: {
      show: true,
      position: 'right',
    },
    colors: ['#00AB55', '#2D99FF', '#FFE700', '#826AF9', '#FF3D71'],
    theme: {
      mode: 'dark',
    },
  }

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const { data, isLoading } = useCustomQuery({
    queryKey: [`services/${id}/${startDate ? startDate.toISOString() : ''}${endDate ? endDate.toISOString() : ''}`],
    url: `services/${id}${startDate ? `?startDate=${startDate.toISOString()}` : ''}${
      endDate ? `&endDate=${endDate.toISOString()}` : ''
    }`,
    pollInterval: refetchInterval,
    enabled: !!id,
    config: {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    },
  })

  console.log('data from dashboard', data)

  const calculatePieSeries = (data: any) => {
    const newPieSeries = [0, 0, 0, 0, 0]
    data.forEach((item: any) => {
      newPieSeries[logTypes.indexOf(item.status)]++
    })
    return newPieSeries
  }

  const calculateAvailabilityLineSeries = (data: any, duration: number) => {
    const newAvailabilityLineSeries: any[] = []
    const timeStamps: any[] = []
    const types = ['success', 'throttlingError', 'invalidInputError']
    let currentTime = new Date(data[0].time)
    let newTimeStyle = currentTime.toISOString()
    newTimeStyle = newTimeStyle.split('T')[0] + ' ' + newTimeStyle.split('T')[1].split('.')[0]

    timeStamps.push(newTimeStyle)

    const listOfListsOfLogs = data.reduce((acc: any[], item: any) => {
      if (types.includes(item.status)) {
        const index = Math.floor((new Date(item.time).getTime() - currentTime.getTime()) / duration)
        acc[index] = acc[index] || []
        acc[index].push(item)
      }
      return acc
    }, [])

    // console.log('listOfListsOfLogs', listOfListsOfLogs)

    for (const id of Object.keys(listOfListsOfLogs)) {
      const list = listOfListsOfLogs[id] || []
      let success = 0
      let throttlingError = 0
      let invalidInputError = 0
      if (Array.isArray(list)) {
        list.forEach((item: any) => {
          success += item.status === 'success' ? 1 : 0
          throttlingError += item.status === 'throttlingError' ? 1 : 0
          invalidInputError += item.status === 'invalidInputError' ? 1 : 0
        })
      }
      const availability = (success / (success + throttlingError + invalidInputError)) * 100
      newAvailabilityLineSeries.push(availability)
      currentTime = new Date(currentTime.getTime() + duration)
      newTimeStyle = currentTime.toISOString()
      newTimeStyle = newTimeStyle.split('T')[0] + ' ' + newTimeStyle.split('T')[1].split('.')[0]
      timeStamps.push(newTimeStyle)
    }
    return [newAvailabilityLineSeries, timeStamps]
  }

  useEffect(() => {
    setPieSeries([])
    setAvailabilityLineSeries([])
    setAvailabilityLineOptions((prevOptions: any) => ({
      ...prevOptions,
      xaxis: {
        categories: [],
      },
    }))
  }, [id])

  useEffect(() => {
    if (data && id) {
      const [lineSeries, timeStamps] = calculateAvailabilityLineSeries(data, refetchInterval)
      setPieSeries(calculatePieSeries(data))
      setAvailabilityLineSeries([{ name: 'Availability', data: lineSeries }])
      setAvailabilityLineOptions((prevOptions: any) => ({
        ...prevOptions,
        xaxis: {
          categories: timeStamps,
        },
      }))
    }
  }, [data, id, refetchInterval])


  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/*     <div className="flex gap-3 mb-4">
        <div className="flex flex-col">
          <label className="text-white">Start Date</label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="p-2 text-white bg-gray-800"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">End Date</label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="p-2 text-white bg-gray-800"
          />
        </div>
      </div> */}
      {!id ? (
        <h1 className="text-2xl text-center text-white">Please choose service to open it</h1>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select
            className="absolute h-10 text-white bg-gray-800 top-4 right-4"
            onChange={(e) => setRefetchInterval(Number(e.target.value))}
          >
            <option value="30000">30 seconds</option>
            <option value="60000">1 minute</option>
            <option value="300000">5 minutes</option>
          </select>
          <div className="flex flex-col gap-3 2xl:flex-row">
            <ChartBox options={pieOptions} series={pieSeries} type="pie" width="500" />
            <ChartBox options={availabilityLineOptions} series={availabilityLineSeries} type="line" width="500" />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
