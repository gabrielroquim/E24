import 'dotenv/config'
import axios from 'axios'
import data from '../data/payload.json'

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`

export const userList = async () => {
    return await axios.post(`${baseUrl}/graphql`, data, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjM3NjM1OTk4LCJleHAiOjE2Mzc4MDg3OTh9.oDPW0raH0iF-y5UGGb1_OkcD8AW_iLUV3EagvF0jzfQ',
            "Content-Type": 'application/json'
        }
    })
}