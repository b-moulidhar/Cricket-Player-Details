import express from "express"
import PlayersCtrl from "./cricketplayers.controller.js"
import ReviewsCtrl from './reviews.controller.js'
const router = express.Router()

router.route("/").get(PlayersCtrl.apiGetPlayers)
router.route("/id/:id").get(PlayersCtrl.apiGetPlayerById)
router.route("/teams").get(PlayersCtrl.apiGetTeams)
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)


export default router