import React, { useEffect, useState } from "react";
import api from "../../../apis/base";
import { jwtDecode } from "jwt-decode";
import { Image, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function AddForm({ onAlbumAdded }) {
  const [studioId, setStudioId] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [price, setPrice] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getStudioDetail = async () => {
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

      const response = await api.get(`/accounts/${encodeURIComponent(studioEmail)}`);
      const data = response.data.content;
      setStudioId(data.studioId);
      console.log(studioId);
    } catch (e) {
      console.error("Error occur at:", e);
    }
  };

  const addAlbum = async (e) => {
    e.preventDefault();
    try {
      const albumData = {
        studioId: studioId,
        name: albumName,
        price: price,
        status: "ACTIVE",
      };
  
      const response = await api.post("/albums", albumData);
      const data = response.data.content;
      message.success("Album added successfully");
      onAlbumAdded();
      
      // Reset form
      setAlbumName("");
      setPrice("");
      setAlbumId("");
      setFileList([]);
    } catch (e) {
      message.error("Error adding album:", e);
    }
  };
  


  const uploadImage = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData(); // Create a FormData object to send the image file and albumId
      formData.append("albumId", albumId); // Add albumId to the form data
      formData.append("image", file); // Add the image file to the form data
  
      const response = await api.post(
        "/albumPhotos/addImage", 
        formData, // Send formData as the body
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
  
      onSuccess("Image uploaded successfully", file);
      message.success("Image uploaded successfully");
    } catch (error) {
      onError(error);
      message.error("Error uploading image");
    }
  };
  
  useEffect(() => {
    getStudioDetail();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-y-8 pt-10 w-2/5 mx-auto">
      <form
        onSubmit={addAlbum}
        className="bg-white shadow-sm ring-1 ring-black md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-y-8">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Album name
              </label>
              <div className="mt-2">
                <input
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  className="block w-full border-2 border-black py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full border-2 border-black py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="px-3 py-2 text-sm font-semibold text-white bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-semibold text-white bg-black"
          >
            Save
          </button>
        </div>
      </form>

      {albumId && (
        <div className="my-10">
          <Upload
            customRequest={uploadImage}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AddForm;
