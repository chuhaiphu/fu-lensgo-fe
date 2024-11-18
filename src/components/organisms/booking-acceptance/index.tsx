import { Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { Button } from "../../atoms/button/Button";
import React from 'react'



function TableRender({
}) {
    const [dataSource, setDataSource] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isOpenCancelModel, setIsOpenCancelModel] = useState(false);


    const bookingColumns = [

        {
            title: "user name",
            dataIndex: "sender",
            key: "sender",
            render: (id: string, record: any) => (
                <span>{record?.student ? record.student.fullName : record?.team?.userTeams[0]?.user?.fullName}</span>
            )
        },
        {
            title: "phone number",
            dataIndex: "topic",
            key: "topic",
            render: (id: string, record: any) => (
                <span>{record?.team?.topics[0]?.name}</span>
            )
        },
        {
            title: "email",
            dataIndex: "topic",
            key: "topic",
            render: (id: string, record: any) => (
                <span>{record?.team?.topics[0]?.name}</span>
            )
        },
        {
            title: "available",
            dataIndex: "topic",
            key: "topic",
            render: (id: string, record: any) => (
                <span>{record?.team?.topics[0]?.name}</span>
            )
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (id: string, record: any) => (
                <span>{record?.createdAt}</span>
            )
        },
        {
            title: "available",
            dataIndex: "id",
            key: "id",
            render: (id: string, record: any) => (
                <div className="flex gap-2 float-end">
                    <Popconfirm
                        title={`Giảng viên có chắc chắn muốn từ chối yêu cầu này không?`}
                        onConfirm={() => handleReject(record?.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button status="none" variant="outlined" size="xs" fontSize="xs">Từ chối</Button>
                        </Popconfirm>
    
                        <Popconfirm
                        title={`Giảng viên có chắc chắn muốn chấp nhận yêu cầu này không?`}
                        onConfirm={() => handleApprove(record?.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                    <Button size="xs" fontSize="xs">Chấp nhận</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    const handleReject = (id: string) => {

    }
    
    const handleApprove = (id: string) => {

    }
    


    return (
        <>
            <Table columns={bookingColumns} dataSource={dataSource} loading={isFetching}></Table>
        </>
    );
}

export default TableRender;
