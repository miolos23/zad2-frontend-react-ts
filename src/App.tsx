import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMeeting from "./components/add-meeting.component";
import Meeting from "./components/meeting.component"; //relative path
import MeetingList from "components/meetings-list.component"; //absolute path - add string *** "baseUrl": "src" *** in tsconfig.json

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/meetings"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/meetings"} className="nav-link">
                Meetings
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/meetings"]} component={MeetingList} />
            <Route exact path="/add" component={AddMeeting} />
            <Route path="/meetings/:id" component={Meeting} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;