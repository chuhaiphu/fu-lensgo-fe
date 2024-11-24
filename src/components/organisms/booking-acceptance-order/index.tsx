import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getBookingsApi } from "../../../apis/booking";
import { getAccountById } from "../../../apis/user-api";
import { getStudioByIdApi } from "../../../apis/studio-api";

function BookingTable() {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchDetails = async (bookings: any[]) => {
        const updatedBookings = await Promise.all(
            bookings.map(async (booking) => {
                const { studioId, accountId } = booking;

                // Fetch studio name
                let studioName = "Unknown Studio";
                if (studioId) {
                    try {
                        const studioResponse = await getStudioByIdApi(studioId);
                        studioName = studioResponse?.name || studioName;
                    } catch (error) {
                        console.error(`Error fetching studio with ID: ${studioId}`, error);
                    }
                }

                // Fetch account name
                let accountName = "Unknown Account";
                if (accountId) {
                    try {
                        const accountResponse = await getAccountById(accountId);
                        accountName = accountResponse?.fullName || accountName;
                    } catch (error) {
                        console.error(`Error fetching account with ID: ${accountId}`, error);
                    }
                }

                return {
                    ...booking,
                    studioName,
                    accountName,
                };
            })
        );

        return updatedBookings;
    };

    useEffect(() => {
        const fetchBookings = async () => {
            setIsFetching(true);
            try {
                const response = await getBookingsApi();
                const result = response;

                const fetchDetails = async (bookings: any[]) => {
                    const updatedBookings = await Promise.all(
                        bookings.map(async (booking) => {
                            const { studioId, accountId } = booking;

                            // Fetch studio name
                            let studioName = "Unknown Studio";
                            if (studioId) {
                                try {
                                    const studioResponse = await getStudioByIdApi(studioId);
                                    console.log("studioResponse", studioResponse);
                                    studioName = studioResponse.content.name || studioName;
                                } catch (error) {
                                    console.error(`Error fetching studio with ID: ${studioId}`, error);
                                }
                            }

                            // Fetch account name
                            let accountName = "Unknown Account";
                            if (accountId) {
                                try {
                                    const accountResponse = await getAccountById(accountId);
                                    console.log("accountResponse", accountResponse);
                                    accountName = accountResponse.content.fullName || accountName;
                                } catch (error) {
                                    console.error(`Error fetching account with ID: ${accountId}`, error);
                                }
                            }

                            return {
                                ...booking,
                                studioName,
                                accountName,
                            };
                        })
                    );

                    return updatedBookings;
                };

                // Fetch studio and account details
                const bookingsWithDetails = await fetchDetails(result.content);
                setDataSource(bookingsWithDetails);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchBookings();
    }, []);

    const columns = [
        {
            title: "No.",
            key: "number",
            render: (_: any, __: any, index: number) => index + 1, // Display the row number
        },
        {
            title: "Studio Name",
            dataIndex: "studioName",
            key: "studioName",
        },
        {
            title: "Account Name",
            dataIndex: "accountName",
            key: "accountName",
        },
        {
            title: "Price (VND)",
            dataIndex: "price",
            key: "price",
            render: (price: number) => price.toLocaleString("vi-VN"), // Format price
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (startTime: string) =>
                new Date(startTime).toLocaleString(), // Format start time
        },
        {
            title: "Date of Photoshoot",
            dataIndex: "dateOfPhotoshoot",
            key: "dateOfPhotoshoot",
            render: (date: string) => new Date(date).toLocaleDateString(), // Format date
        },
        {
            title: "Duration (hours)",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Meeting Location",
            dataIndex: "meetingLocation",
            key: "meetingLocation",
        },
        {
            title: "Additional Info",
            dataIndex: "additionalInfo",
            key: "additionalInfo",
        },
        
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={isFetching}
            rowKey={(record) => record.id} // Use unique ID for row keys
            pagination={{ pageSize: 10 }} // Pagination enabled
        />
    );
}

export default BookingTable;
