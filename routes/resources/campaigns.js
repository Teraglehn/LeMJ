let express = require('express')
let router = express.Router()

let _ = require('lodash')

router.route('/')
  .get(function (req, res) {
    let db = req.db
    let resources = db.get('campaigns')

    let user = req.session.authUser
    let userId = user._id

    resources.find({$or: [{mj: '' + userId}, {visibility: true}]}, {})
      .then((resource) => {
        res.json(resource)
      })
      .catch((e) => {
        res.send(500)
      })
  })
  .post(function (req, res) {
    let db = req.db
    let resources = db.get('campaigns')

    resources.insert(req.body, {})
      .then((resource) => {
        res.json(resource)
      })
      .catch((e) => {
        res.send(500)
      })
  })

router.route('/id/:id')
  .get(function (req, res) {
    let db = req.db
    let campaigns = db.get('campaigns')

    // TODO : check : public / mj / invité / joueur

    campaigns.findOne({_id: req.param('id')}, {})
      .then((response) => {
        res.json(response)
      }, (e) => {
        res.send(404)
      })
  })
  .put(async (req, res) => {
    let db = req.db
    let campaigns = db.get('campaigns')

    try {
      let campaign = await campaigns.findOne({_id: req.param('id')}, {})

      if (!campaign.mj === req.session.authUser._id) {
        res.send(403)
      } else {
        let update = _.extend(campaign, req.body)
        res.json(await campaigns.findOneAndUpdate({_id: req.param('id')}, update, {}))
      }
    } catch (e) {
      res.send(500)
    }
  })
  .delete(async (req, res) => {
    let db = req.db
    let campaigns = db.get('campaigns')

    try {
      let campaign = await campaigns.findOne({_id: req.param('id')}, {})

      if (!campaign.mj === req.session.authUser._id) {
        res.send(403)
      } else {
        res.json(await campaigns.findOneAndDelete({_id: req.param('id')}, {}))
      }
    } catch (e) {
      res.send(500)
    }
  })

module.exports = router
