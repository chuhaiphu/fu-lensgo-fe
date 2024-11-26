
import api from "./base";

export const addImageToAlbum = async (albumId, file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post(`/albumPhotos/addImage?albumId=${albumId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const updateAlbumImage = async (albumPhotoId, file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.put(`/albumPhotos/updateImage?albumPhotoId=${albumPhotoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};
