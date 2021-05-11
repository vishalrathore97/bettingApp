import React from "react";

const Playing9 = ({ selectedPlayers }) => {
  return (
    <React.Fragment>
      {selectedPlayers.map((p, index) => (
        <div key={index} className="card">
          <div className="row g-0">
            <div className="col-3">
              <img className="img-resize" src={p["Profile Image"]} alt="..." />
            </div>
            <div className="col-6">
              <h5 className="card-title">{p.Name}</h5>
              <span className="mr-3">
                <i className="fa fa-trophy" aria-hidden="true" /> {p.wins}
              </span>
              <span>
                <i className="fa fa-plus-circle" aria-hidden="true" /> {p.Bet}
              </span>
            </div>
            <div className="col-3">
              <i className="fa fa-inr" aria-hidden="true" /> {p.Price}
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Playing9;
