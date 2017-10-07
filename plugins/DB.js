import axios from './axios'

export default {
  getCampaigns: async (req) => {
    let response = await axios(req).get(`/api/rest/campaigns`)
    return response.data
  },
  deleteCampaign: async (id) => {
    let response = await axios().delete(`/api/rest/campaigns/id/` + id)
    return response.data
  }
}
