import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import { getStudiosApi } from '../../../apis/studio-api';

function TableRender() {
    const [dataSource, setDataSource] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchStudios = async (page: number, pageSize: number) => {
        setIsFetching(true);
        try {
            const response = await getStudiosApi();
            const { content, metaDataDTO } = response;

            // Map response data to dataSource for the table
            setDataSource(
                content.map((studio: any) => ({
                    key: studio.id,
                    name: studio.name,
                    amount: studio.amount,
                    bankAccount: studio.bankAccount,
                    bankName: studio.bankName,
                    createdDate: studio.createdDate,
                    updatedDate: studio.updatedDate,
                    logo: studio.logoLink,
                    overview: studio.overview,
                    camera: studio.camera,
                    availableCity: studio.availableCity,
                    status: studio.status
                }))
            );

            // Update pagination
            setPagination({
                current: metaDataDTO.page,
                pageSize: metaDataDTO.limit,
                total: metaDataDTO.total,
            });
        } catch (error) {
            message.error('Failed to fetch studios data');
        } finally {
            setIsFetching(false);
        }
    };

    const handleTableChange = (pagination: any) => {
        fetchStudios(pagination.current, pagination.pageSize);
    };

    useEffect(() => {
        fetchStudios(pagination.current, pagination.pageSize);
    }, []);

    const columns = [
        {
            title: 'Studio Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <span>{amount.toLocaleString()} VND</span>,
        },
        {
            title: 'Bank Account',
            dataIndex: 'bankAccount',
            key: 'bankAccount',
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
   
        {
            title: 'Available City',
            dataIndex: 'availableCity',
            key: 'availableCity',
        },
        {
            title: 'Camera',
            dataIndex: 'camera',
            key: 'camera',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={isFetching}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
            }}
            onChange={handleTableChange}
        />
    );
}

export default TableRender;
