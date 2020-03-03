import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import "./DetailsPage.css";
import "w3-css/w3.css";
import jsonClasses from "../commons/amenities.json";

const DetailsPage = ({ match }) => {
  const id = match.params.id;
  const [index, setIndex] = useState(0);
  const [hotel, setHotel] = useState({});
  const imageRef = React.useRef();
  const imagesArr = [];
  const [carouselImages, setCarouselImages] = useState({
    one: 0,
    two: 1,
    three: 2
  });

  const fetchHotelDetails = async () => {
    const apiCall = await fetch(`http://localhost:3000/hotels/${id}`);
    const response = await apiCall.json();
    setHotel(response);
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  useEffect(() => {
    if (index === 0) {
      setCarouselImages({
        ...carouselImages,
        one: index,
        two: index + 1,
        three: index + 2
      });
    } else if (index % 3 === 0) {
      setCarouselImages({
        ...carouselImages,
        one: index,
        two: index + 1,
        three: index + 2
      });
    }
  }, [index]);

  const showPrev = () => {
    if (index === 0) setIndex(imagesArr.length - 1);
    else setIndex(i => i - 1);
  };
  const showNext = () => {
    if (index === imagesArr.length - 1) setIndex(0);
    else setIndex(i => i + 1);
  };

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
        <div class="w3-content w3-display-container w3-half w3-teal">
          {Object.keys(hotel).map((item, index) => {
            if (item == "images") {
              return (
                <div>
                  {Object.values(hotel[item]).map(imge => {
                    imagesArr.push(imge);
                  })}
                </div>
              );
            }
          })}
          {imagesArr.length > 0 && (
            <div class="cn">
              <img
                class="image"
                src={require(`../assets/${imagesArr[index]}`)}
                alt={"hotel "}
                ref={imageRef}
              />
              <div class="top-left">
                {imagesArr[index].split("/")[1].split(".")[0]}
              </div>
            </div>
          )}

          <button class="w3-button w3-black w3-display-left" onClick={showPrev}>
            &#10094;
          </button>
          <button
            class="w3-button w3-black w3-display-right"
            onClick={showNext}
          >
            &#10095;
          </button>
          <div class="w3-row-padding w3-section">
            {imagesArr.length > 0 && (
              <div>
                {typeof imagesArr[carouselImages["one"]] != "undefined" && (
                  <div class="w3-col s4">
                    <div class="cn">
                      <img
                        class="image"
                        src={require(`../assets/${
                          imagesArr[carouselImages["one"]]
                        }`)}
                        alt={"hotel "}
                        ref={imageRef}
                      />
                      <div class="top-left-num">
                        Photo {carouselImages["one"] + 1}
                      </div>
                    </div>
                  </div>
                )}
                {typeof imagesArr[carouselImages["two"]] != "undefined" && (
                  <div class="w3-col s4">
                    <div class="cn">
                      <img
                        class="image"
                        src={require(`../assets/${
                          imagesArr[carouselImages["two"]]
                        }`)}
                        alt={"hotel "}
                        ref={imageRef}
                      />
                      <div class="top-left-num">
                        Photo {carouselImages["two"] + 1}
                      </div>
                    </div>
                  </div>
                )}
                {typeof imagesArr[carouselImages["three"]] != "undefined" && (
                  <div class="w3-col s4">
                    <div class="cn">
                      <img
                        class="image"
                        src={require(`../assets/${
                          imagesArr[carouselImages["three"]]
                        }`)}
                        alt={"hotel "}
                        ref={imageRef}
                      />
                      <div class="top-left-num">
                        Photo {carouselImages["three"] + 1}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div class="w3-content w3-display-container w3-half">
          <h3 class="w3-center">{hotel.name}</h3>
          <p>
            {hotel.long_description && (
              <div>
                <h5>{"Location"}</h5>
                <p>{hotel.long_description.location}</p>
                <h5>{"Special Features"}</h5>
                <p>{hotel.long_description.special_features}</p>
              </div>
            )}

            {hotel.amenities && (
              <div>
                <h5>{"By Hotel services"}</h5>
                <p>
                  {hotel.amenities["hotel_amenities"].map(item => {
                    return <i class={jsonClasses[item]}>{item}</i>;
                  })}
                </p>
                <h5>{"In Room amenities"}</h5>
                <p>
                  {hotel.amenities["room_amenities"].map(item => {
                    return <i class={jsonClasses[item]}>{item}</i>;
                  })}
                </p>
              </div>
            )}
          </p>
          {hotel.price && imagesArr.length > 0 && (
            <div class="tableWidth">
              <table class="w3-table w3-striped">
                {imagesArr.map(image => {
                  if (image.split("/")[1].split(".")[0] != "MainView")
                    return (
                      <tr>
                        <td>{image.split("/")[1].split(".")[0]}</td>
                        <td>
                          {hotel.price[image.split("/")[1].split(".")[0]]}
                        </td>
                        <td>
                          <Link
                            to={`/hotel/${hotel["id"]}/${
                              image.split("/")[1].split(".")[0]
                            }/${
                              hotel.price[image.split("/")[1].split(".")[0]]
                            }/${hotel["name"]}`}
                          >
                            <button class="info">Book Now</button>
                          </Link>
                        </td>
                      </tr>
                    );
                })}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(DetailsPage);
