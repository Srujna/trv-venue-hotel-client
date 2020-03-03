/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import "./LandingPage.css";
import Modal from "../commons/Modal";
import useModal from "../commons/useModal";

const LandingPage = ({ match }) => {
  const [admin, setAdmin] = useState(false);
  const [hotels, setHotels] = useState([]);
  const { isShowing, toggle } = useModal();

  //Price range filter
  const [showPriceFilter, setPriceFilter] = useState(false);
  const [rangeLabel, setRangeLabel] = useState("Price range");
  const [range, setRange] = useState("all");
  const [clearPriceFilter, setClearPriceFilter] = useState(false);

  //distane_to_venue
  const [showDistnaceVenue, setShowDistnaceVenue] = useState(false);
  const [distanceLabel, setDistanceLabel] = useState("Distance to Venue");
  const [distance, setDistance] = useState("all");
  const [clearDistanceFilter, setClearDistanceFilter] = useState(false);

  //rating
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [ratingLabel, setRatingLabel] = useState("Rating");
  const [rating, setRating] = useState("all");
  const [clearRatingFilter, setClearRatingFilter] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    amenities: []
  });

  const reset = () => {
    setPriceFilter(false);
    setRangeLabel("Price range");
    setRange("all");
    setClearPriceFilter(false);
    setShowDistnaceVenue(false);
    setDistanceLabel("Distance to Venue");
    setDistance("all");
    setClearDistanceFilter(false);
    setShowRatingFilter(false);
    setRatingLabel("Rating");
    setRating("all");
    setClearRatingFilter(false);
  };

  const fetchHotels = async () => {
    const apiCall = await fetch("http://localhost:3000/hotels");
    const response = await apiCall.json();
    setHotels(response);
  };

  useEffect(() => {
    fetchHotels();
    if (Object.keys(match.params).length > 0) setAdmin(true);
    else setAdmin(false);
    console.log(Object.keys(match.params).length > 0, admin);
  }, [match.params]);

  const changeHandler = (name, amenities) => {
    setDetails({ ...details, name: name, amenities: amenities });
  };
  function togglePriceFilter() {
    setPriceFilter(!showPriceFilter);
  }
  function toggleDistanceFilter() {
    setShowDistnaceVenue(!showDistnaceVenue);
  }
  function toggleRatingFilter() {
    setShowRatingFilter(!showRatingFilter);
  }

  const getStars = rating => {
    let floor = Math.floor(rating);
    let decimal = rating % 1;
    let itags = [];
    for (let i = 0; i < floor; i++) {
      itags.push(<i class="fa fa-star checked"></i>);
    }
    if (decimal !== 0) itags.push(<i class="fa fa-star-half-full"></i>);
    if (floor < 5) {
      let restStars = 5 - floor;
      for (let i = 1; i < restStars; i++)
        itags.push(<i class="fa fa-star unchecked"></i>);
    }
    return itags;
  };

  const getHotels = r => {
    setPriceFilter(false);
    setRangeLabel("Showing: " + r);
    setRange(r);
    setClearPriceFilter(true);
  };

  const getDistanceHotels = d => {
    setDistanceLabel("Under " + d + " kms");
    setDistance(d);
    setClearDistanceFilter(true);
    setShowDistnaceVenue(false);
  };

  const getRatingHotels = r => {
    setRatingLabel("Rating: " + r);
    setRating(r);
    setClearRatingFilter(true);
    setShowRatingFilter(false);
  };

  const checkFilters = hotel => {
    let renderable = true;

    if (range !== "all") {
      if (hotel["price_category"] !== range) renderable = false;
    }
    if (distance !== "all") {
      if (hotel["distance_to_venue"] > distance) renderable = false;
    }
    if (rating !== "all") {
      if (Math.floor(hotel["rating"]) != rating) renderable = false;
    }
    return renderable;
  };
  return (
    <div class="said">
      <header>
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

        <div class="options">
          <div className="dd-wrapper">
            <div className="dd-header" onClick={togglePriceFilter}>
              <div className="dd-header-title">{rangeLabel} </div>
              <div className="angle-down">
                {clearPriceFilter && (
                  <a
                    href="#"
                    onClick={e => {
                      e.stopPropagation();
                      setPriceFilter(false);
                      setRangeLabel("Price range");
                      setRange("all");
                      setClearPriceFilter(false);
                    }}
                  >
                    <i class="fa fa-times-circle"></i>
                  </a>
                )}
              </div>
            </div>
            {showPriceFilter && (
              <ul className="dd-list">
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getHotels("high");
                  }}
                >
                  high
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getHotels("medium");
                  }}
                >
                  medium
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getHotels("low");
                  }}
                >
                  low
                </li>
              </ul>
            )}
          </div>
          <div className="dd-wrapper">
            <div className="dd-header" onClick={toggleDistanceFilter}>
              <div className="dd-header-title">{distanceLabel} </div>
              <div className="angle-down">
                {clearDistanceFilter && (
                  <a
                    href="#"
                    onClick={e => {
                      e.stopPropagation();
                      setClearDistanceFilter(false);
                      setDistanceLabel("Distance to Venue");
                      setDistance("all");
                      setShowDistnaceVenue(false);
                    }}
                  >
                    <i class="fa fa-times-circle"></i>
                  </a>
                )}
              </div>
            </div>
            {showDistnaceVenue && (
              <ul className="dd-list">
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getDistanceHotels(3);
                  }}
                >
                  {"< 3 kms"}
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getDistanceHotels(2);
                  }}
                >
                  {"< 2 kms"}
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getDistanceHotels(1);
                  }}
                >
                  {"< 1 km"}
                </li>
              </ul>
            )}
          </div>
          <div className="dd-wrapper">
            <div className="dd-header" onClick={toggleRatingFilter}>
              <div className="dd-header-title">{ratingLabel} </div>
              <div className="angle-down">
                {clearRatingFilter && (
                  <a
                    href="#"
                    onClick={e => {
                      e.stopPropagation();
                      setShowRatingFilter(false);
                      setRatingLabel("Rating");
                      setRating("all");
                      setClearRatingFilter(false);
                    }}
                  >
                    <i class="fa fa-times-circle"></i>
                  </a>
                )}
              </div>
            </div>
            {showRatingFilter && (
              <ul className="dd-list">
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getRatingHotels(5);
                  }}
                >
                  5
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getRatingHotels(4);
                  }}
                >
                  4
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getRatingHotels(3);
                  }}
                >
                  3
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getRatingHotels(2);
                  }}
                >
                  2
                </li>
                <li
                  className="dd-list-item"
                  onClick={() => {
                    getRatingHotels(1);
                  }}
                >
                  1
                </li>
              </ul>
            )}
          </div>
          <button class="reset" onClick={reset}>
            Clear
          </button>
        </div>
      </header>

      <main>
        {admin && (
          <section class="new">
            <div>
              <div class="name">
                Click to add new hotel<i class="fa fa-long-arrow-right"></i>
              </div>
            </div>
            <div class="form-inline">
              <Link to="/add"><button
                class="info"
              >
                Add new hotel{" "}
              </button></Link>
            </div>
          </section>
        )}
        {hotels.map(hotel => {
          const img_url = hotel["images"][0];
          let renderable = checkFilters(hotel);
          if (renderable)
            return (
              <section>
                <div class="stars-inline">
                  <div class="name">{hotel.name}</div>
                  <div class="rating">
                    {hotel.rating}
                    {"      "}
                    {getStars(hotel.rating).map(item => {
                      return item;
                    })}
                  </div>
                </div>
                <div class="cn">
                  <img
                    class="image"
                    src={require(`../assets/${img_url}`)}
                    alt={"hotel " + hotel["name"]}
                  />
                  {hotel["verified"] && (
                    <div class="top-left">
                      Verified
                      <i class="fa fa-check-circle"></i>
                    </div>
                  )}
                </div>

                <p>{hotel.description}</p>
                <div class="form-inline">
                  <button
                    class="info"
                    onClick={() => {
                      changeHandler(hotel.name, hotel.amenities);
                      toggle();
                    }}
                  >
                    Amenities <i class="fa fa-info"></i>
                  </button>
                  <Link to={`/hotel/${hotel["id"]}`}>
                    <button class="info">
                      More Details <i class="fa fa-long-arrow-right"></i>{" "}
                    </button>
                  </Link>
                </div>
              </section>
            );
        })}
      </main>
      <Modal isShowing={isShowing} hide={toggle} details={details} />
    </div>
  );
};

export default withRouter(LandingPage);
