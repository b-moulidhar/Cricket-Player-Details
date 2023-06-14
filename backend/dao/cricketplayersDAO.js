import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let players

export default class PlayersDAO {
  static async injectDB(conn) {
    if (players) {
      return
    }
    try {
      players = await conn.db(process.env.RESTREVIEWS_NS).collection("cricket_player_details")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getPlayers({
    filters = null,
    page = 0,
    playersPerPage = 20,
  } = {}) {
    let query
    if (filters) {
       if ("role" in filters) {
        query = { "role": { $eq: filters["role"] } }
      } else if ("country" in filters) {
        query = { "country": { $eq: filters["country"] } }
      } else if("team" in filters)
      {
        query = { "team": { $eq: filters["team"] } }
      }
    }

    let cursor
    
    try {
      cursor = await players
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { playersList: [], totalNumPlayers: 0 }
    }

    const displayCursor = cursor.limit(playersPerPage).skip(playersPerPage * page)

    try {
      const playersList = await displayCursor.toArray()
      const totalNumPlayers = await players.countDocuments(query)

      return { playersList, totalNumPlayers }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { playersList: [], totalNumPlayers: 0 }
    }
  }
  static async getPlayerByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$player_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await players.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }
  static async getTeams() {
    let teams = []
    try {
      teams = await players.distinct("team")
      return teams
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return teams
    }
  }
  
}