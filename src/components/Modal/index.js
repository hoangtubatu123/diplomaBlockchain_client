import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class ModalComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
