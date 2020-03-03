import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.css";
import jsonClasses from "../commons/amenities.json";

import "font-awesome/css/font-awesome.min.css";

const Modal = ({ isShowing, hide, details }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div class="modal-overlay"></div>
          <div
            class="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={styles.modal}>
              <div class="modal-header">
                Amenities @ {details.name}
                <button
                  type="button"
                  class="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="grid-container">
              <div class="header"><h4>By hotel</h4></div>
              <div class="header"><h4>In room</h4></div>
                <div>
                  {details.amenities["hotel_amenities"].map(item => {
                    return (
                      <i class={jsonClasses[item]}>{item}</i>
                    );
                  })}
                </div>
                <div>
                  {details.amenities["room_amenities"].map(item => {
                    return <i class={jsonClasses[item]}>{item}</i>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
