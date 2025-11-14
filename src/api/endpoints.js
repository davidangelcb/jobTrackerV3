import api from './index'

export const getData = async (url) => {
  const { data } = await api.get(url)
  return data
}

export const postData = async (url, payload) => {
  const { data } = await api.post(url, payload)
  return data
}

export const putData = async (url, payload) => {
  const { data } = await api.put(url, payload)
  return data
}

export const deleteData = async (url) => {
  const { data } = await api.delete(url)
  return data
}

/*
// USO

import { useEffect } from 'react'
import { getData, postData } from '../api/endpoints'

export default function Users() {
  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await getData('/users')
        console.log('Usuarios:', users)
      } catch (err) {
        console.error('Error cargando usuarios:', err)
      }
    }

    loadUsers()
  }, [])

  const addUser = async () => {
    await postData('/users', { name: 'Luis', email: 'test@example.com' })
  }

  return (
    <div>
      <h2>Usuarios</h2>
      <button onClick={addUser}>Agregar usuario</button>
    </div>
  )
}
*/