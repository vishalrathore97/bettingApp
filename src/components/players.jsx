import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Playing9 from "./playing9";
import { toast } from "react-toastify";
import SearchBox from "./searchBox";

class Players extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    search: "",
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleStart = (selectedPlayers) => {
    if (selectedPlayers.length !== 9) {
      toast.info("Select 9 players.");
    } else {
      this.props.history.push("/start");
    }
  };

  handleSearch = ({ currentTarget }) => {
    this.setState({
      search: currentTarget.value,
      currentPage: 1,
    });
  };

  render() {
    const { pageSize, currentPage, search } = this.state;
    const { players } = this.props;
    const selectedPlayers = players.filter((p) => p.selected) || [];

    let allPlayers = players.map((p) => p);
    if (search) {
      let regex = new RegExp("^" + search, "i");
      allPlayers = players.filter((p) => regex.test(p.Name));
    }
    let currentPagePlayers = paginate(allPlayers, pageSize, currentPage);
    return (
      <div className="row mt-4">
        <div className="col-3 ml-2 ">
          <img src="/logo2.png" alt="" />
          <h5 className="mb-4">Playing 9</h5>
          <Playing9 selectedPlayers={selectedPlayers} />
          <button
            onClick={() => this.handleStart(selectedPlayers)}
            className="btn btn-primary mt-4"
            disabled={selectedPlayers.length > 0 ? false : true}
          >
            START
          </button>
        </div>
        <div className="col">
          <h4 className="mb-3">Select Playing 9</h4>
          <SearchBox value={search} onChange={this.handleSearch} />
          <table className="table ">
            <thead>
              <tr>
                <th>SELECT</th>
                <th>PLAYER NAME</th>
                <th>AVATAR</th>
                <th>
                  <i className="fa fa-plus-circle" aria-hidden="true" /> BET
                </th>
                <th>
                  <i className="fa fa-trophy" aria-hidden="true" /> WINS
                </th>
                <th>LOST</th>
                <th>
                  <i className="fa fa-inr" aria-hidden="true" /> PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPagePlayers.map((player, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={player.selected}
                      onChange={() => this.props.onPlayerSelect(player)}
                    />
                  </td>
                  <td>
                    <label htmlFor={index}>{player.Name}</label>
                  </td>
                  <td>
                    <img src={player["Profile Image"]} alt="" />
                  </td>
                  <td>{player.Bet}</td>
                  <td>{player.wins}</td>
                  <td>{player.lost}</td>
                  <td>{player.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pageSize={pageSize}
            itemsCount={players.length}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Players;
