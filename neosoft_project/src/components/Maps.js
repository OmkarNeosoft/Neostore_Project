import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button, Modal } from "react-bootstrap";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
    // setTimeout(() => {
    //   this.setState({ color: 'wheat' });
    // }, 2000);
    this.handleModal();
  }

  render() {
    return (
      <>
        <div className="modalClass">
          {/* <Button onClick={() => this.handleModal()}>
            Locate Us
          </Button> */}
        </div>
        <Modal show={this.state.show} onHide={() => this.handleModal()}>
          <Modal.Body style={{ height: "500px" }}>
            <Map
              google={this.props.google}
              style={{ width: "100%", height: "100%" }}
              zoom={14}
              initialCenter={{
                lat: 19.024448758444095,
                lng: 72.84437282905316,
              }}
            ></Map>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleModal()}>Close</Button>
            <Button onClick={() => this.handleModal()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIby30kmEEd9u0P1EQnv9KJDiK1YEn9Rs",
})(MapContainer);
