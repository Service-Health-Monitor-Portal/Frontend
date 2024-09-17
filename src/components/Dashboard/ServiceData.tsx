import { useWindowWidth } from '@react-hook/window-size'
import { useEffect, useState } from 'react'
import useCustomQuery from '../../hooks/useCustomQuery'
import { calculateAvailabilityLineSeries, calculateLineSeries, calculatePieSeries, logTypes } from '../../functions'
import Loader from '../Loader'
import ChartBox from './ChartBox'

interface IProps {
    id: string
}

const ServiceData = ({ id }: IProps) => {
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
    title: { text: 'All Logs', align: 'left' },
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

  const { data, isLoading, isError } = useCustomQuery({
    queryKey: [`servicesData/${id}`],
    url: `influxdb/services/${id}`,
    pollInterval: refetchInterval,
    enabled: !!id,
    config: { headers: { 'ngrok-skip-browser-warning': '1',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     } },
  })

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

      const logTypesNames: any = {
        success: 'Success',
        dependencyError: 'DependencyError',
        faultError: 'FaultError',
        throttlingError: 'Throttle',
        invalidInputError: 'InvalidInputError',
      }

      const newMultipleLinesSeries = logTypes.map((type) => ({
        name: logTypesNames[type],
        data: successLineSeries.map((item: any) => item[type]),
      }))

      setMultipleLinesSeries(newMultipleLinesSeries)

      setMultipleLinesOptions((prevOptions: any) => ({
        ...prevOptions,
        xaxis: { categories: successTimeStamps },
        colors: ['#00AB55', '#2D99FF', '#FFE700', '#826AF9', '#FF3D71'],
      }))
    }
  }, [data, id, refetchInterval])

  const windowWidth = useWindowWidth()
  const chartWidth = windowWidth < 768 ? '300' : '500'
  const chartHeightForPie = windowWidth < 768 ? '250' : '300'
  const chartHeight = windowWidth < 768 ? '300' : '350'

  if (!id)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
        <div className="text-white text-xl font-semibold">Please choose service to open it</div>
      </div>
    )

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
        <Loader />
      </div>
    )

    if (isError)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
        <div className="text-white text-xl font-semibold">No data available</div>
      </div>
    )

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-auto">
      <div className="w-full flex justify-between items-center h-10 mt-12 px-5">
        <select
          role="combobox"
          className="h-10 text-white bg-gray-800"
          onChange={(e) => setRefetchInterval(Number(e.target.value))}
        >
          <option value="30000">30 seconds</option>
          <option value="60000">1 minute</option>
          <option value="300000">5 minutes</option>
        </select>
      </div>
      <div className="flex flex-col gap-5 mt-20 md:mt-0 h-full p-8">
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
          <ChartBox options={pieOptions} series={pieSeries} type="pie" width={chartWidth} height={chartHeightForPie} />
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
    </div>
  )
}

export default ServiceData
