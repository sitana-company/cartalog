import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from 'antd';

const CarsList = ({ }) => {
    const [ initialized, setInitialized ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ dataSource, setDataSource ] = useState([]);
    const [ pagination, setPagination ] = useState({});

    const columns = [
        {
          title: 'Marca',
          dataIndex: 'brand',
          sorter: true,
          width: '20%',
        },
        {
          title: 'Modelo',
          dataIndex: 'model',
          sorter: true,
          width: '20%',
        },
        {
          title: 'Placa',
          dataIndex: 'plate',
          sorter: true,
          width: '20%',
        }
    ];

    const fetchList = (args)=> {
        fetch('/api/cars/list.netuno', {
            method: 'POST',
            body: JSON.stringify(args),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            setLoading(false);
            setDataSource(json.items);
            pagination.total = json.total;
            setPagination(pagination)
        });
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setLoading(true);
        const pager = { ...pagination };
        pager.current = pagination.current;
        setPagination(pager);
        fetchList({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order
        });
    };

    useEffect(() => {
        if (!initialized) {
            fetchList();
            setInitialized(true);
        }
    });

    return <div>
        <Table
            columns={columns}
            rowKey={record => record.uid}
            dataSource={dataSource}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
      </div>;
};

CarsList.propTypes = {
};

export default CarsList;
