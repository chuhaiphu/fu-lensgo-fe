import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {getAccountsApi} from "../../../apis/user-api";

function AccountTable() {
    const [dataSource, setDataSource] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            setIsFetching(true);
            try {
                const response = await getAccountsApi();
                const result = response;

                // Filter records where studioId is null
                const filteredAccounts = result.content.filter(
                    (account: any) => account.studioId === null
                );

                setDataSource(filteredAccounts);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchAccounts();
    }, []);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "authId",
            key: "authId",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date of Birth",
            dataIndex: "dob",
            key: "dob",
            render: (dob: string) => new Date(dob).toLocaleDateString(), // Format the date
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Instagram",
            dataIndex: "instagram",
            key: "instagram",
            render: (insta: string) =>
                insta ? <a href={`https://instagram.com/${insta}`} target="_blank" rel="noopener noreferrer">@{insta}</a> : "N/A",
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={isFetching}
            rowKey={(record) => record.id} // Unique row identifier
            pagination={{ pageSize: 10 }} // Enable pagination
        />
    );
}

export default AccountTable;
