import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Form, Input, Pagination, Spin, message } from "antd";
import { jwtDecode } from "jwt-decode";
import api from "../../apis/base";
import AddForm from "./AddForm";

function PhotographerEditPage() {
  const [studioId, setStudioId] = useState("");
  const [album, setAlbum] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [albumId, setAlbumId] = useState("");
  const [form] = Form.useForm();
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false); // Loading state

  const getAlbum = async (page = 1, limit = 10) => {
    setLoading(true); // Set loading to true before fetching data
    try {
      let rawAccessToken = localStorage.getItem("access_token");
      let rawRefreshToken = localStorage.getItem("refresh_token");

      if (!rawAccessToken || !rawRefreshToken) {
        console.error("Token does not exist");
        return;
      }

      const accessToken = rawAccessToken.replace(/^"|"$/g, "");
      const refreshToken = rawRefreshToken.replace(/^"|"$/g, "");

      const decodedToken = jwtDecode(accessToken);
      const studioEmail = decodedToken.sub;

      const response = await api.get(
        `/accounts/${encodeURIComponent(studioEmail)}`
      );
      const data = response.data.content;
      setStudioId(data.studioId);

      const albumResponse = await api.get(
        `/albums/search?studioId=${studioId}&page=${page}&limit=${limit}`
      );
      const albumData = albumResponse.data.content;
      setAlbum(albumData);
      setTotalAlbums(albumResponse.data.total);
    } catch (e) {
      console.error("Error occurred:", e);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getAlbum(page, limit); // Fetch albums on initial render
  }, [page, limit]);

  const handleEdit = (album) => {
    setAlbumId(album.id);
    setIsEditing(true);
    form.setFieldsValue(album);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const updatedAlbum = {
        id: albumId,
        studioId: studioId,
        name: values.name,
        price: values.price,
        status: "ACTIVE",
      };

      const response = await api.put(`/albums`, updatedAlbum);

      if (response.status === 200) {
        message.success("Album updated successfully:", response.data);

        const updatedAlbumData = album.map((a) =>
          a.id === albumId ? { ...a, ...updatedAlbum } : a
        );
        setAlbum(updatedAlbumData);

        setIsEditing(false);
        form.resetFields();
      } else {
        console.error("Failed to update album:", response);
      }
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status === "ACTIVE") {
          color = "green";
        } else if (status === "UNKNOWN") {
          color = "volcano";
        } else {
          color = "geekblue";
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl justify-center">
        <div className="my-10">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Edit your album
          </h2>
          <Spin spinning={loading}>
            {" "}
            {/* Show loading spinner */}
            <Table
              pagination={{
                current: page, // Trang hiện tại
                total: totalAlbums, // Tổng số album
                pageSize: limit, // Số lượng album mỗi trang
                onChange: (page, pageSize) => {
                  setPage(page); // Cập nhật trang khi người dùng thay đổi trang
                  setLimit(pageSize); // Cập nhật số lượng item mỗi trang khi thay đổi
                },
              }}
              columns={columns}
              dataSource={album}
            />
          </Spin>

          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Add a new album
          </h2>
          <AddForm />
        </div>

        <Modal
          title="Edit Album"
          open={isEditing}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Album Name"
              rules={[
                { required: true, message: "Please input the album name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default PhotographerEditPage;
