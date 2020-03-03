import React from "react";
import { withRouter } from "react-router-dom";
import "./AddDetails.css";
import "w3-css/w3.css";

const AddDetails = ({ match }) => {
  console.log(match.params);

  return (
    <div>
      <div>
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
        <h2>Submit below details..</h2>
        <div class="elem">
          <p>
            <label for="hname">Hotel Name</label>
            <input
              type="text"
              id="hname"
              name="hotelname"
              placeholder="Hotel name.."
            />
          </p>
          <p>
            <label for="rooms">Number of rooms</label>
            <input
              type="text"
              id="rooms"
              name="rooms"
              placeholder="Room count.."
            />
          </p>
          <p>
            <label for="price">Price Range</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price range.."
            />
          </p>
          <p>
            <label for="rating">Rating</label>
            <input
              type="text"
              id="rating"
              name="rating"
              placeholder="Rating."
            />
          </p>
          <p>
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Write something.."
            ></textarea>
          </p>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddDetails);
