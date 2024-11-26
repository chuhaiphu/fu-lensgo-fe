import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import api from "../../../apis/base";
import AddForm from "./AddForm";
import ImageArray from "./ImageArray";

function Album() {
  const [studioId, setStudioId] = useState("");
  const [loading, setLoading] = useState(false);

  const getStudioId = async () => {
    setLoading(true);
    try {
      let rawAccessToken = localStorage.getItem("access_token");
      let rawRefreshToken = localStorage.getItem("refresh_token");

      if (!rawAccessToken || !rawRefreshToken) {
        console.error("Token does not exist");
        return;
      }

      const accessToken = rawAccessToken.replace(/^"|"$/g, "");
      const decodedToken = jwtDecode(accessToken);
      const studioEmail = decodedToken.sub;

      const response = await api.get(
        `/accounts/${encodeURIComponent(studioEmail)}`
      );
      const data = response.data.content;
      setStudioId(data.studioId);
    } catch (e) {
      console.error("Error occurred:", e);
    } finally {
      setLoading(false);
    }
  };

  const [albumsUpdated, setAlbumsUpdated] = useState(false); // Add this state

  useEffect(() => {
    getStudioId();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl justify-center">
      <div className="my-10">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-8">
          Add a new album
        </h2>
        <AddForm onAlbumAdded={() => setAlbumsUpdated(prev => !prev)} />
      </div>

      <Spin spinning={loading}>
        <div className="my-10">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-8">
            YOUR ALBUMS
          </h2>
          <ImageArray
            studioId={studioId}
            albumsUpdated={albumsUpdated}
            onAlbumDeleted={() => setAlbumsUpdated(prev => !prev)}
          />
        </div>
      </Spin>
    </div>
  );
}

export default Album;