import api from "./base";

export const getAlbumsApi = async () => {
  try {
    const response = await api.get("/albums/search");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAlbumsByStudioId = async ({studioId}) => {
  try {
    const response = await api.get(`/albums/search?studioId=${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};


export const getAlbumByIdApi = async (albumId) => {
  try {
    const response = await api.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAlbumPhotosApi = async () => {
  try {
    const response = await api.get(`/albumPhotos?limit=999`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAlbumPhotosByAlbumIdApi = async ({albumId}) => {
  try {
    const response = await api.get(`/albumPhotos/search?albumId=${albumId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};