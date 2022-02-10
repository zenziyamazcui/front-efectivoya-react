import axios from 'axios'

const baseUrl = process.env.REACT_APP_INTERACCIONES

const interacciones = async information => {
  const { data } = await axios.post(baseUrl, information)
  return data
}

export default { interacciones }