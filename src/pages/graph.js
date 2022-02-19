import React from "react";
import './code_css/graph.css'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


class Graph extends React.Component {
    data_return(x, y) {
        console.log('rev', x);
       console.log('revs', y);
        let reverse = x.reverse()
        console.log(reverse)
        const data = {
            labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
            datasets: [
                {
                    label: 'what',
                    data: y,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                // {
                //     label: "Second dataset",
                //     data: [33, 25, 35, 51, 54, 76],
                //     fill: false,
                //     borderColor: "#742774"
                // }
            ]
        };

        return data;
    };

    render() {
        return (
            < div className="time" >
                <Line data={this.data_return(this.props.x_arr, this.props.y_arr)} />
            </div >
        )
    }
};
   

export default Graph;