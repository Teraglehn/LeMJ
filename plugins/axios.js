import axios from 'axios'

export default function (req) {
  let options = {}
  options.headers = {}

  options.baseURL = process.env.BASE_URL

  if (req) {
    options.headers = req.headers
  }

  return axios.create(options)
}
