import React, { useState, useEffect } from "react";
import PlayersDataService from "../services/players";
import { Link } from "react-router-dom";

const Player = props => {
  const initialPlayerState = {
    id: null,
    name: "",
    age:0,
    country: "",
    role:"",
    team:"",
    matches:0,
    runs:0,
    wickets:0,
    reviews: []
  };
  const [player, setPlayer] = useState(initialPlayerState);

  const getPlayer = id => {
    PlayersDataService.get(id)
      .then(response => {
        setPlayer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlayer(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    PlayersDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setPlayer((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {player ? (
        <div>
          <h5>{player.name}</h5>
          <p>
            <strong>Role: </strong>{player.role}<br/>
            <strong>Team: </strong>{player.team}
          </p>
          <Link to={"/players/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {player.reviews.length > 0 ? (
             player.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/players/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Player;