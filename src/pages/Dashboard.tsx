import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import ChartBox from '../components/Dashboard/ChartBox'
import useCustomQuery from '../hooks/useCustomQuery'

const Dashboard = () => {
  const { id } = useParams<{ id: string }>()
  const logTypes = ['success', 'dependencyError', 'faultError', 'throttlingError', 'invalidInputError']
  const [refetchInterval, setRefetchInterval] = useState<number>(30000)
  const [availabilityLineSeries, setAvailabilityLineSeries] = useState<any[]>([])
  const [availabilityLineOptions, setAvailabilityLineOptions] = useState<any>({
    chart: { height: 350, type: 'line' },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    title: { text: 'Availability', align: 'left' },
    xaxis: { categories: [] },
    yaxis: {
      title: { text: 'Availability' },
      labels: { formatter: (val: number) => val.toFixed(0) + '%' },
      min: 0,
      max: 100,
    },
    theme: { mode: 'dark' },
  })

  const initialState = {
    chart: { height: 350, type: 'line' },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    xaxis: { categories: [] },
    yaxis: { title: { text: '' }, labels: { formatter: (val: number) => val.toFixed(0) } },
    theme: { mode: 'dark' },
  }

  const [multipleLinesSeries, setMultipleLinesSeries] = useState<any[]>([])

  const [multipleLinesOptions, setMultipleLinesOptions] = useState<any>({
    ...initialState,
    title: { text: 'All Logs', align: 'left' },
  })

  const [pieSeries, setPieSeries] = useState<any[]>([])
  const pieOptions = {
    labels: ['Success', 'DependencyError', 'Throttle', 'InvalidInputError', 'FaultError'],
    legend: { show: true, position: 'bottom' },
    colors: ['#00AB55', '#2D99FF', '#FFE700', '#826AF9', '#FF3D71'],
    theme: { mode: 'dark' },
  }

  const { data, isLoading } = useCustomQuery({
    queryKey: [`services/${id}`],
    url: `services/${id}`,
    pollInterval: refetchInterval,
    enabled: !!id,
    config: { headers: { 'ngrok-skip-browser-warning': '1' } },
  })

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

    timeStamps.push(currentTime.toISOString())

    const listOfListsOfLogs = data.reduce((acc: any[], item: any) => {
      if (types.includes(item.status)) {
        const index = Math.floor((new Date(item.time).getTime() - currentTime.getTime()) / duration)
        acc[index] = acc[index] || []
        acc[index].push(item)
      }
      return acc
    }, [])

    for (const id of Object.keys(listOfListsOfLogs)) {
      const list = listOfListsOfLogs[id] || []
      let success = 0,
        throttlingError = 0,
        invalidInputError = 0
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
      timeStamps.push(currentTime.toISOString())
    }
    return [newAvailabilityLineSeries, timeStamps]
  }

  const calculateLineSeries = (data: any, duration: number) => {
    const newLineSeries: any[] = []
    const timeStamps: any[] = []
    const types = ['success', 'dependencyError', 'faultError', 'throttlingError', 'invalidInputError']
    let currentTime = new Date(data[0].time)

    timeStamps.push(currentTime.toISOString())

    const listOfListsOfLogs = data.reduce((acc: any[], item: any) => {
      if (types.includes(item.status)) {
        const index = Math.floor((new Date(item.time).getTime() - currentTime.getTime()) / duration)
        acc[index] = acc[index] || []
        acc[index].push(item)
      }
      return acc
    }, [])

    Object.keys(listOfListsOfLogs).forEach((id) => {
      const list = listOfListsOfLogs[id] || []
      let success = 0,
        dependencyError = 0,
        faultError = 0,
        throttlingError = 0,
        invalidInputError = 0
      if (Array.isArray(list)) {
        list.forEach((item: any) => {
          success += item.status === 'success' ? 1 : 0
          dependencyError += item.status === 'dependencyError' ? 1 : 0
          faultError += item.status === 'faultError' ? 1 : 0
          throttlingError += item.status === 'throttlingError' ? 1 : 0
          invalidInputError += item.status === 'invalidInputError' ? 1 : 0
        })
      }
      newLineSeries.push({ success, dependencyError, faultError, throttlingError, invalidInputError })
      currentTime = new Date(currentTime.getTime() + duration)
      timeStamps.push(currentTime.toISOString())
    })

    return [newLineSeries, timeStamps]
  }

  useEffect(() => {
    if (id) {
      setAvailabilityLineSeries([])
      setAvailabilityLineOptions({
        chart: { height: 350, type: 'line' },
        dataLabels: { enabled: false },
        stroke: { curve: 'straight' },
        title: { text: 'Availability', align: 'left' },
        xaxis: { categories: [] },
        yaxis: {
          title: { text: 'Availability' },
          labels: { formatter: (val: number) => val.toFixed(0) + '%' },
          min: 0,
          max: 100,
        },
        theme: { mode: 'dark' },
      })

      setPieSeries([])

      setMultipleLinesSeries([])

      setMultipleLinesOptions({
        chart: { height: 350, type: 'line' },
        dataLabels: { enabled: false },
        stroke: { curve: 'straight' },
        title: { text: 'All Logs', align: 'left' },
        xaxis: { categories: [] },
        yaxis: { title: { text: '' }, labels: { formatter: (val: number) => val.toFixed(0) } },
        theme: { mode: 'dark' },
      })
    }
  }, [id])

  useEffect(() => {
    if (data && id) {
      const [lineSeries, timeStamps] = calculateAvailabilityLineSeries(data, refetchInterval)
      setPieSeries(calculatePieSeries(data))
      setAvailabilityLineSeries([{ name: 'Availability', data: lineSeries }])
      setAvailabilityLineOptions((prevOptions: any) => ({ ...prevOptions, xaxis: { categories: timeStamps } }))

      const [successLineSeries, successTimeStamps] = calculateLineSeries(data, refetchInterval)

      const newMultipleLinesSeries = logTypes.map((type) => ({
        name: type,
        data: successLineSeries.map((item: any) => item[type]),
      }))

      setMultipleLinesSeries(newMultipleLinesSeries)

      setMultipleLinesOptions((prevOptions: any) => ({ ...prevOptions, xaxis: { categories: successTimeStamps } }))
    }
  }, [data, id, refetchInterval])

  const windowWidth = useWindowWidth()
  const chartWidth = windowWidth < 768 ? '300' : '500'
  const chartHeightForPie = windowWidth < 768 ? '250' : '300'
  const chartHeight = windowWidth < 768 ? '300' : '350'

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[rgb(58,84,145)] to-[#182655] overflow-auto">
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
          <div className="flex flex-col gap-5 mt-20 md:mt-0 h-full p-8">
            <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
              <ChartBox
                options={pieOptions}
                series={pieSeries}
                type="pie"
                width={chartWidth}
                height={chartHeightForPie}
              />
              <ChartBox
                options={availabilityLineOptions}
                series={availabilityLineSeries}
                type="line"
                width={chartWidth}
                height={chartHeight}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <ChartBox
                options={multipleLinesOptions}
                series={multipleLinesSeries}
                type="line"
                width={chartWidth}
                height={chartHeight}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
