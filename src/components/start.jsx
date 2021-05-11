import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";

class Start extends Component {
  state = {
    num: 0,
  };
  updateAll = () => {
    let newNum = _.random(1, 9);

    const players = this.props.players.map((p) => {
      if (p.selected) {
        
        console.log(p.Name + " " + p.Price);
        if (newNum === parseInt(p.Bet)) {
          p.wins += 1;
          p.Price *= 2;
        } else {
          p.lost += 1;
        }
      }
      return p;
    });
    this.props.onBetChange(players);
    this.setState({ num: newNum });
  };
  setBadge = (num, bet) => {
    let betNo = parseInt(bet);
    return num === betNo ? "WINNER" : "LOSE";
  };
  setBadgeClass = (num, bet) => {
    let betNo = parseInt(bet);
    let badgeClass = "card-footer ";
    badgeClass += num === betNo ? "bg-success" : "bg-danger";
    return badgeClass;
  };
  componentDidMount() {
    let newNum = _.random(1, 9);
    const players = this.props.players.map((p) => {
      if (p.selected) {
        console.log(p.Name + " " + p.Price);
        if (newNum === parseInt(p.Bet)) {
          p.wins += 1;
          p.Price *= 2;
        } else {
          p.lost += 1;
        }
      }
      return p;
    });
    this.props.onBetChange(players);
    this.setState({ num: newNum });
  }

  render() {
    const { playing9 } = this.props;
    const { num } = this.state;
    if (playing9.length !== 9) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <button onClick={this.updateAll} className="btn-primary btn-fixed-2">
          TRY AGAIN
        </button>
        <button
          onClick={() => this.props.history.push("/")}
          className="btn-primary btn-fixed"
        >
          BACK
        </button>
        <div className="container mt-3">
          <h1 className="text-center mb-3">
            <span className="badge rounded-pill bg-secondary">{num}</span>
          </h1>
          <div className="row justify-content-md-center text-center">
            {playing9.map((p, index) => (
              <div key={index} className="col-sm-auto mb-4 ml-2 mr-2">
                <div className="card h-100">
                  <img
                    src={p["Profile Image"]}
                    className="card-img-top "
                    alt="..."
                  />
                  <div>
                    <h5>{p.Name}</h5>
                    <span className="mr-3">
                      <i className="fa fa-trophy" /> {p.wins}
                    </span>
                    <span>
                      <i className="fa fa-plus-circle" /> {p.Bet}
                    </span>
                    <p>
                      <i className="fa fa-inr" /> {p.Price}
                    </p>
                  </div>
                  <div className={this.setBadgeClass(num, p.Bet)}>
                    <span>{this.setBadge(num, p.Bet)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Start;
