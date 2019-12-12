import React, { useState } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

const CarsAutoComplete = ({ onSelect }) => {
    const [ dataSource, setDataSource ] = useState([]);

    const handleSearch = (value)=> {
        fetch('/api/cars/auto-complete.netuno?text='+ value, {
            credentials: 'include'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            setDataSource(json.map((car) => {
                return <Option key={car.uid}>{ `${car.brand} > ${car.model} > ${car.plate}` }</Option>
            }));
        });
    };
    
    return <div style={ { paddingBottom: "20px" } }>
        <AutoComplete
            dataSource={dataSource}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={handleSearch}
            placeholder="Escolha o carro..."
        />
    </div>; 
};

CarsAutoComplete.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default CarsAutoComplete;
