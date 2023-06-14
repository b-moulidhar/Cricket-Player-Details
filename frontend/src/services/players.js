import http from "../http-common";

class PlayersDataService
{
    getAll(page = 0) {
        return http.get(`?page=${page}`);
      }
    
      get(id) {
        return http.get(`/id/${id}`);
      }
    
      find(query, by = "role", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
      } 
    
      createReview(data) {
        return http.post("/review", data);
      }
    
      updateReview(data) {
        return http.put("/review", data);
      }
    
      deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`,{data:{user_id:userId}});
      }
      getTeams(id) {
        return http.get(`/teams`);
      }
    
}

export default new PlayersDataService();