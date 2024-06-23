import Chart from "react-apexcharts"
interface IProps {

}

const ChartBox = ({}: IProps) => {
    /*options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]*/
      const state = {
        series: [
          {
            name: "series-1",
            data: [30, 70, 50, 70, 30, 30, 30, 30]
          }
        ],
        options: {
            chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
              },

               
        },
        
      }
return (
    <div className="bg-black-opacity-08 border border-[#101C49] rounded-2xl p-4">
            <Chart
                    options={{ ...state.options, theme: { mode: "dark" } }}
                    series={state.series}
                    type="line"
                    width="500"
            />
    </div>
)
}

export default ChartBox