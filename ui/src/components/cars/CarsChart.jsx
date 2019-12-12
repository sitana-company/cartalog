import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';

export default class CarsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: this.baseChartData()
        };
    }

    componentWillMount() {
        this.load();
    }

    load() {
        const that = this;
        fetch('/api/cars/chart.netuno', {
            credentials: 'include'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const chartData = that.baseChartData();
            json.map((item) => {
                chartData.labels.push(item.brand);
                chartData.datasets[0].data.push(item.total);
            });
            that.setState({ chartData });
        });
    }

    baseChartData() {
        return {
            labels: [ ],
            datasets: [{
                label: 'Marcas',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [ ]
            }]
        };
    }

    render() {
        return <div>
            <Bar
              data={this.state.chartData}
              options={{
                title: {
                  display: "Carros"
                },
                legend: {
                  display: "false",
                  position: "top"
                },
                scales: {
                  yAxes: [{
                    display: true,
                    ticks: {
                      suggestedMin: 0,
                    }
                  }]
                }
              }}
              />
        </div>;
    }
}
