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
import { getQueriesForElement } from "@testing-library/react";

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
    data_return(x, y, r_y) {
        var ret = new Array;
        for (var i = x.length - 1; i >= 0; i--) {
            ret.push(x[i]);
        }
        
        const data = {
            labels: ret,
            pointHoverBackgroundColor: "#742774",
            datasets: [
                {
                    label: 'WPM',
                    data: y,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Keystrokes per second",
                    data: r_y,
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        };

        return data;
    };

    render() {
        return (
            < div className="time" >
                <Line data={this.data_return(this.props.x_arr, this.props.y_arr, this.props.r_y)} />
            </div >
        )
    }
};


export default Graph;