import React from "react";
import { useState, useEffect } from "react";
import PlayersDataService from "../services/players";
import { Link } from "react-router-dom";
const PlayersList = props => {   
    const [players, setPlayers] = useState([]);
    const [searchRole, setSearchRole ] = useState("");
    const [searchCountry, setSearchCountry ] = useState("");
    const [searchTeam, setSearchTeam ] = useState("");
    const [teams, setTeams] = useState(["All Teams"]);

    useEffect(() => {
        retrievePlayers();
        retreiveTeams();
      }, []);
    
    const retrievePlayers = () => {
        PlayersDataService.getAll()
          .then(response => {
            console.log(response.data);
            setPlayers(response.data.players);
            
          })
          .catch(e => {
            console.log(e);
          });
      };
      const onChangeSearchRole = e => {
        const searchRole= e.target.value;
        setSearchRole(searchRole);
      };

      const onChangeSearchCountry = e => {
        const searchCountry = e.target.value;
        setSearchCountry(searchCountry);
      };

      const onChangeSearchTeam = e => {
        const searchTeam = e.target.value;
        setSearchTeam(searchTeam);
        
      };

      const retreiveTeams= () => {
        PlayersDataService.getTeams()
          .then(response => {
            console.log(response.data);
            setTeams(["All Teams"].concat(response.data));
            
          })
          .catch(e => {
            console.log(e);
          });
      };
    

      const refreshList = () => {
        retrievePlayers();
      };

      const find = (query, by) => {
        PlayersDataService.find(query, by)
          .then(response => {
            console.log(response.data);
            setPlayers(response.data.players);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const findByRole = () => {
        find(searchRole, "role")
      };
    
      const findByCountry = () => {
        find(searchCountry, "country")
      };

    const findByTeam = () => {
    if (searchTeam == "All Teams") {
      refreshList();
    } else {
      find(searchTeam, "team")
    }
  };
      
      return (
    <div>
     <div className="row pb-1">
        <div className="input-group col-xs-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by role"
            value={searchRole}
            onChange={onChangeSearchRole}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByRole}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-xs-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country"
            value={searchCountry}
            onChange={onChangeSearchCountry}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCountry}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-xs-4">

          <select onChange={onChangeSearchTeam}>
             {teams.map(team=> {
               return (
                 <option value={team}> {team.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTeam}
            >
              Search
            </button>
          </div>

        </div>
      </div>
          <div className="row">
            {players.map((player) => {
              return (
                <div className="col-lg-4 pb-1">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{player.name}</h5>
                      <p className="card-text">
                        <strong>Role: </strong>{player.role}<br/>
                        <img src="https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png" height={200} width={200}/><br/>
                        <strong>Team: </strong>{player.team}<br/>
                        <strong>Age: </strong>{player.age}<br/>
                        <strong>Country:</strong>{player.country}<br/>
                        <strong>Matches:</strong>{player.matches}<br/>
                        <strong>Runs:</strong>{player.runs}<br/>
                        <strong>Wickets:</strong>{player.wickets}<br/>
                      </p>
                      <div className="row">
                      <Link to={"/player/"+player._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        View Reviews
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
    
    
          </div>
        </div>
      );
}
  
  export default PlayersList;