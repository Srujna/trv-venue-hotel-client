import React from "react";

import { Route } from "react-router-dom";

import LandingPage from "./components/LandingPage.jsx";
import DetailsPage from "./components/DetailsPage.jsx";
import ConfirmationPage from "./components/ConfirmationPage.jsx";
import AddDetails from "./components/AddDetails.jsx";

const Main = () => {
  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <LandingPage />
          </div>
        )}
      />
      <Route
        exact
        path="/hotel/:id"
        render={() => (
          <div>
            <DetailsPage />
          </div>
        )}
      />
      <Route
        exact
        path="/hotel/:id/:roomId/:price/:name"
        render={() => (
          <div>
            <ConfirmationPage />
          </div>
        )}
      />
      <Route
        exact
        path="/hotels/:admin"
        render={() => (
          <div>
            <LandingPage />
          </div>
        )}
      />
      <Route
        exact
        path="/add"
        render={() => (
          <div>
            <AddDetails />
          </div>
        )}
      />
    </div>
  );
};

export default Main;
