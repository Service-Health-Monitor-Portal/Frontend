import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

interface IProps {}

const ChartBox = ({}: IProps) => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "Availability",
            data: [] as number[],
        }],
        options: {
            chart: {
                id: "availability-chart",
            },
            xaxis: {
                categories: [] as string[],
                title: {
                    text: "Timestamp"
                }
            },
            yaxis: {
                title: {
                    text: "Availability (%)"
                },
                min: 0,
                max: 100,
            },
            theme: {
                mode: "dark" as "dark" | "light" | undefined,
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/influxdb/availability");
                console.log("Data fetched:", response.data);
                const data = response.data;

                const timestamps = data.map((entry: any) => entry.timestamp);
                const timestampsFormatted = timestamps.map((timestamp: string) => {
                    const date = new Date(timestamp);
                    return date.toLocaleString();
                });
                const availability = data.map((entry: any) => entry.availability);

                setChartData({
                    series: [{
                        name: "Availability",
                        data: availability,
                    }],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: timestampsFormatted,
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="bg-black-opacity-08 border border-[#101C49] rounded-2xl p-4">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                width="800"
            />
        </div>
    );
}

export default ChartBox;
