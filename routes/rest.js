let express = require('express')
let router = express.Router()

let _ = require('lodash')

router.route('/:ressource')
  .get(function (req, res) {
    let db = req.db
    let ressources = db.get(req.params.ressource)

    ressources.find({})
      .then((docs) => {
        res.json(docs)
      })
      .catch((e) => {
        res.status(500).json({})
      })
  })
  .post(function (req, res) {
    let db = req.db
    let ressources = db.get(req.params.ressource)

    ressources.insert(req.body, {})
      .then((response) => {
        res.json(response)
      })
      .catch((e) => {
        res.status(500).json({})
      })
  })

router.route('/:ressource/:id')
  .get(function (req, res) {
    let db = req.db
    let ressources = db.get(req.param('ressource'))

    ressources.findOne({_id: req.param('id')}, {})
      .then((response) => {
        res.json(response)
      }, (e) => {
        res.status(404).json({})
      })
  })
  .put(function (req, res) {
    let db = req.db
    let ressources = db.get(req.param('ressource'))

    ressources.findOne({_id: req.param('id')}, {})
      .then((response) => {
        let update = _.extend(response, req.body)
        return ressources.findOneAndUpdate({_id: req.param('id')}, update, {})
      }, (e) => {
        res.status(404).json({})
      })
      .then((response) => {
        res.json(response)
      }, (e) => {
        res.status(500).json({})
      })
  })
  .delete(function (req, res) {
    let db = req.db
    let ressources = db.get(req.param('ressource'))

    ressources.findOneAndDelete({_id: req.param('id')}, {}).then((e, response) => {
      res.json(response)
    }, (e) => {
      res.status(404).json({})
    })
  })

module.exports = router
