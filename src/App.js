import './App.css';
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect } from 'react';
import { Bar, Doughnut, Line} from "react-chartjs-2"

function App() {

    let data1;
    let option1;


    data1 = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Info 1',
                data: [10, 20, 30],
                backgroundColor: 'rgb(43, 43, 43)',
            },
            {
                label: 'Info 2',
                data: [2, 39, 10],
                backgroundColor: 'rgb(139, 139, 139)',
            },
            {
                label: 'Info 3',
                data: [20, 13, 16],
                backgroundColor: 'rgb(209, 209, 209)',
            }
        ],
        backgroundColor: [

        ]
    }

    option1 = {
        maintainAspectRatio: false
    }

    const option2 = {
        maintainAspectRatio: true
    }




  return (
    <main>
        <div className="graph-1 container">
            <Bar data={data1} options={option1}/>
        </div>

        <div className="graph-2 container">
            <Doughnut data={data1} options={option2}/>
        </div>

        <div className="graph-3 container">
            <Line data={data1}/>
        </div>
    </main>
  );
}

export default App;
