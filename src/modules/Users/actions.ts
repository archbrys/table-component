import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NAME } from './constants'

const fetchUsers = createAsyncThunk(`${NAME}/fetchUsers`, async () => {
  const response = await axios({
    method: 'get',
    url: 'https://dummyjson.com/users',
  })

  return response.data
})

// eslint-disable-next-line import/prefer-default-export
export { fetchUsers }
