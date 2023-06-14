import PlayersDAO from "../dao/cricketplayersDAO.js"
import CricketPlayersDAO from "../dao/cricketplayersDAO.js"

export default class PlayersController {
  static async apiGetPlayers(req, res, next) {
    const playersPerPage = req.query.playersPerPage ? parseInt(req.query.playersPerPage, 10) : 1000
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.role) {
      filters.role = req.query.role
    } else if (req.query.country) {
      filters.country = req.query.country
    } else if(req.query.team)
    {
      filters.team=req.query.team
    }

    const { playersList,totalNumPlayers} = await CricketPlayersDAO.getPlayers({
      filters,
      page,
      playersPerPage,
    })

    let response = {
      players: playersList,
      page: page,
      filters: filters,
      entries_per_page: playersPerPage,
      total_results: totalNumPlayers,
    }
    res.json(response)
  }
  static async apiGetPlayerById(req, res, next) {
    try {
      let id = req.params.id || {}
      let player = await PlayersDAO.getPlayerByID(id)
      if (!player) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(player)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetTeams(req, res, next) {
    try {
      let teams = await PlayersDAO.getTeams()
      res.json(teams)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}