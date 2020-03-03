import React from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./ConfirmationPage.css";
import "w3-css/w3.css";

const ConfirmationPage = ({ match }) => {
  console.log(match.params);


  return (
    <div>
      <div class="said">
        <div class="head">
          <p class="title">Hotel Booking Portal for Developers</p>
          <p class="prof">
            Hello, Jane{" "}
            <img
              src={require("../assets/Jane.png")}
              alt="Avatar"
              class="avatar"
            />
          </p>
        </div>
        {match.params && (
          <div class="announcement">
            <h2>!!Booking Confirmation!!</h2>
            <p>Congratulations, your booking has been confirmed</p>
            <p>Following are the transaction details.</p>

            <div class="tableWidth">
              <table class="w3-table w3-striped">
                <tr>
                  <td>Transaction ID</td>
                  <td>{uuidv4()}</td>
                </tr>
                <tr>
                  <td>Hotel ID</td>
                  <td>{match.params.id}</td>
                </tr>
                <tr>
                  <td>Hotel Name</td>
                  <td>{match.params.name}</td>
                </tr>
                <tr>
                  <td>Room Type</td>
                  <td>{match.params.roomId}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{match.params.price}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(ConfirmationPage);
