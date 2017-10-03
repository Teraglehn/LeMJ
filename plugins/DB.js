import axios from './axios'

export default {
  getCampaigns: async (req) => {
    let response = await axios(req).get(`/api/rest/campaigns`)
    return response.data
  }
}
