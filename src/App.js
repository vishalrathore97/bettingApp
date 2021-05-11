import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Players from "./components/players";
import Start from "./components/start";
import "react-toastify/dist/ReactToastify.css";

const apiEndpoint =
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json";

class App extends Component {
  state = {
    players: [],
  };
  async componentDidMount() {
    const { data } = await axios.get(apiEndpoint);
    const players = data.map((d) => {
      return { selected: false, wins: 0, lost: 0, ...d };
    });
    this.setState({ players });
  }
  handleBetChange = (players) => {
    this.setState({ players });
  };
  handleSelectedPlayer = (player) => {
    const players = [...this.state.players];
    const index = players.indexOf(player);
    players[index] = { ...player };
    players[index].selected = !players[index].selected;
    this.setState({ players });
  };
  render() {
    const playing9 = this.state.players.filter((p) => p.selected);
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route
            path="/start"
            render={(props) => (
              <Start
                playing9={playing9}
                players={this.state.players}
                onBetChange={this.handleBetChange}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <Players
                players={this.state.players}
                onPlayerSelect={this.handleSelectedPlayer}
                {...props}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
