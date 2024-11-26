import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { CameraIcon, TrashIcon } from '@heroicons/react/24/outline'
import { getAlbumsByStudioId, getAlbumPhotosByAlbumIdApi, deleteAlbumPhotoApi, deleteAlbumApi } from "../../../apis/album-api"
import api from "../../../apis/base"
import { addImageToAlbum } from '../../../apis/image'

function ImageArray({ studioId, albumsUpdated, onAlbumDeleted }) {
  const [albums, setAlbums] = useState([])
  const [albumPhotos, setAlbumPhotos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchAlbumsAndPhotos = async () => {
      try {
        const albumsResponse = await getAlbumsByStudioId({ studioId })
        setAlbums(albumsResponse.content)

        const photosPromises = albumsResponse.content.map(album =>
          getAlbumPhotosByAlbumIdApi({ albumId: album.id })
        )
        const photosResponses = await Promise.all(photosPromises)
        const allPhotos = photosResponses.flatMap(response => response.content)
        setAlbumPhotos(allPhotos)
      } catch (error) {
        console.error("Error fetching albums and photos:", error)
      }
    }

    fetchAlbumsAndPhotos()
  }, [studioId, albumsUpdated])

  const handleEditAlbum = (album) => {
    setSelectedAlbum(album)
    setIsEditing(true)
    form.setFieldsValue({ 
      name: album.name,
      price: album.price 
    })
  }

  const handleUpdateAlbum = async () => {
    try {
      const values = await form.validateFields()
      const updatedAlbum = {
        id: selectedAlbum.id,
        studioId: studioId,
        name: values.name,
        price: values.price,
        status: "ACTIVE"
      }

      const response = await api.put(`/albums`, updatedAlbum)
      if (response.status === 200) {
        message.success("Album updated successfully")
        setAlbums(albums.map(album =>
          album.id === selectedAlbum.id 
            ? { ...album, name: values.name, price: values.price } 
            : album
        ))
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating album:", error)
    }
  }

  const handleDeleteAlbum = async (albumId) => {
    try {
      await deleteAlbumApi(albumId);
      message.success('Album deleted successfully');
      onAlbumDeleted(); // This will trigger the re-render
    } catch (error) {
      message.error('Failed to delete album');
    }
  };

  const refreshAlbumPhotos = async () => {
    const albumsResponse = await getAlbumsByStudioId({ studioId })
    setAlbums(albumsResponse.content)

    const photosPromises = albumsResponse.content.map(album =>
      getAlbumPhotosByAlbumIdApi({ albumId: album.id })
    )
    const photosResponses = await Promise.all(photosPromises)
    const allPhotos = photosResponses.flatMap(response => response.content)
    setAlbumPhotos(allPhotos)
  }

  return (
    <div className="">
      {albums.map((album) => (
        <div key={album.id} className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{album.name} - Price: {album.price} vnđ</h2>
            <Button onClick={() => handleEditAlbum(album)} type="primary">
              Edit
            </Button>
            <Button onClick={() => handleDeleteAlbum(album.id)} type="primary" danger>
              Delete
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {albumPhotos
              .filter(photo => album.albumPhotosIds?.includes(photo.id))
              .slice(0, 4)
              .map((photo, index) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.pictureLink}
                    className="w-full h-64 object-fill rounded-lg"
                    alt={`Album photo ${index + 1}`}
                  />
                  <div className="absolute bottom-2 right-2">
                    <div 
                      className="rounded-full bg-white p-2 cursor-pointer hover:bg-red-100"
                      onClick={async () => {
                        try {
                          await deleteAlbumPhotoApi(photo.id)
                          message.success("Image deleted successfully")
                          await refreshAlbumPhotos()
                        } catch (error) {
                          message.error("Failed to delete image")
                        }
                      }}
                    >
                      <TrashIcon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
              ))}

            {albumPhotos.filter(photo => album.albumPhotosIds?.includes(photo.id)).length < 4 && (
              <div className="relative flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          await addImageToAlbum(album.id, file);
                          message.success("Image uploaded successfully");
                          await refreshAlbumPhotos(); // Refresh all albums and photos
                        } catch (error) {
                          message.error("Failed to upload image");
                        }
                      }
                    }}
                  />
                  <CameraIcon className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                </label>
              </div>
            )}
          </div>
        </div>
      ))}

      <Modal
        title="Edit Album Details"
        open={isEditing}
        onOk={handleUpdateAlbum}
        onCancel={() => setIsEditing(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Album Name"
            rules={[{ required: true, message: 'Please input the album name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Album Price"
            rules={[{ required: true, message: 'Please input the album price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ImageArray