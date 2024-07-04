import Chart from 'react-apexcharts'

interface IProps {
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
  width: string
  series: {
    name: string
    data: number[]
  }[]
  options: any
}

const ChartBox = ({  options, series, type, width }: IProps) => {
  return (
    <div className="bg-black-opacity-08 border border-[#101C49] rounded-2xl p-4">
      <Chart options={options} series={series} type={type} width={width} />
    </div>
  )
}

export default ChartBox
