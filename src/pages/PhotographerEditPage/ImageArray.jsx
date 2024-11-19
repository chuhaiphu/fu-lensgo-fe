import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { CameraIcon } from '@heroicons/react/24/outline'
import { getAlbumsByStudioId, getAlbumPhotosByAlbumIdApi } from "../../apis/album-api"
import api from "../../apis/base"

function ImageArray({ studioId }) {
  const [albums, setAlbums] = useState([])
  const [albumPhotos, setAlbumPhotos] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchAlbumsAndPhotos = async () => {
      try {
        console.log(studioId);
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
  }, [studioId])

  const handleEditName = (album) => {
    setSelectedAlbum(album)
    setIsEditing(true)
    form.setFieldsValue({ name: album.name })
  }

  const handleUpdateName = async () => {
    try {
      const values = await form.validateFields()
      const updatedAlbum = {
        id: selectedAlbum.id,
        studioId: studioId,
        name: values.name,
        status: "ACTIVE"
      }

      const response = await api.put(`/albums`, updatedAlbum)
      if (response.status === 200) {
        message.success("Album name updated successfully")
        setAlbums(albums.map(album => 
          album.id === selectedAlbum.id ? {...album, name: values.name} : album
        ))
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating album name:", error)
    }
  }

  return (
    <div className="space-y-12">
      {albums.map((album) => (
        <div key={album.id} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{album.name}</h2>
            <Button onClick={() => handleEditName(album)} type="primary">
              Edit Name
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
                    className="w-full h-64 object-cover rounded-lg" 
                    alt={`Album photo ${index + 1}`} 
                  />
                  <div className="absolute bottom-2 right-2">
                    <div className="rounded-full bg-white p-2">
                      <CameraIcon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <Modal
        title="Edit Album Name"
        open={isEditing}
        onOk={handleUpdateName}
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
        </Form>
      </Modal>
    </div>
  )
}

export default ImageArray