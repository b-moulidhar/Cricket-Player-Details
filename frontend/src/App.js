import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add_review";
import Player from "./components/player";
import PlayersList from "./components/players_list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/players" className="navbar-brand">
          Players Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/players"} className="nav-link">
              Players
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/players"]} component={PlayersList} />
          <Route 
            path="/players/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/player/:id"
            render={(props) => (
              <Player {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}
export default App;
