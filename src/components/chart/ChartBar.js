import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip
)

const ChartBar = ({ data }) => {
    
    console.log('data weather by hour: ', data);

    const dataMap = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'Sales of the week',
            data: [9, 3, 12],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        plugins: { legend: true },
        scales: {
            y: { min: 3, max: 6 }
        }
    }
    return (
        <>
            <Line
                data={dataMap}
                options={options}
            />
        </>
    )
}

export default ChartBar;