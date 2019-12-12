import React, { Component } from "react";

import MyButton from "../components/MyButton.jsx";

import CarsAutoComplete from '../components/cars/CarsAutoComplete.jsx';

import CarsList from '../components/cars/CarsList.jsx';

import CarsChart from '../components/cars/CarsChart.jsx';

import styles from "./DashboardContainer.less";

export default class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.button = React.createRef();
        this.click = this.click.bind(this);
        this.selectCar = this.selectCar.bind(this);
    }

    componentWillMount() {
        /*
        // Sample of service AJAX call:
        fetch('/services/my-test.netuno', {
            credentials: 'include'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            // json...;
        });
        */
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        $(this.button.current).fadeOut(250).fadeIn(250);
    }

    click() {
        this.setState({ counter: this.state.counter + 1, aaa: 12 });
    }

    selectCar(value) {
        alert(value);
    }

    render() {
        const { counter } = this.state;
        return (
            <div className="my-dashboard">
                <b>Hello margaret</b>
            </div>
        );
    }
}
