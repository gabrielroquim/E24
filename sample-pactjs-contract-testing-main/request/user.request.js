import 'dotenv/config'
import axios from 'axios'
import data from '../data/payload.json'

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`

export const customersList = async () => {
    return await axios.post(`${baseUrl}/graphql`, data, {
        headers:  {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE2Njc1MTQ4MzMsImV4cCI6MTY2NzY4NzYzM30.8sB6b3VcpiusZNfBgJOAvbtRPRknVzyfEXDwacwf2K4',
            "Content-Type": 'application/json'
        }
    })
}