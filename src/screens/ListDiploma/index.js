import React from "react";
import { Form, Row, Card } from "react-bootstrap";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Success from "../../components/Success";
import Modal from "../../components/Modal";
import Item from "./Item";
import _ from "lodash";
export default class ListDiploma extends React.Component {
  constructor() {
    super();
    this.error = React.createRef();
    this.success = React.createRef();
    this.loadingGetFile = React.createRef();
    this.modal = React.createRef();
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modal: false,
      link: "",
      info: null
    };
  }
  getListDiplomaSuccess = response => {
    this.setState({ data: response.data });
  };
  getListDiplomaError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  getDiplomaFile = item => {
    const params = { streamName: item.name };
    if (this.loadingGetFile && this.loadingGetFile.current) {
      this.loadingGetFile.current.requestAPI(params);
    }
  };
  getFileSuccess = response => {
    this.setState(
      { link: response.data.link, info: response.data.info },
      () => {
        if (this.modal && this.modal.current) {
          this.modal.current.handleShow();
        }
      }
    );
  };
  getFileError = error => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  renderModal() {
    if (this.state.info) {
      return (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          {Object.keys(this.state.info).map(item => (
            <Card.Text>{`${item}:  ${this.state.info[item]}`}</Card.Text>
          ))}
          {this.state.link !== "" ? (
            <Card.Link href={this.state.link}>Link lấy chứng chỉ</Card.Link>
          ) : (
            // <Card.Text></Card.Text>
            <Card.Link href={"/"}>
              Bạn chưa cần quay lại trang chủ để lấy key, decode link chứng chỉ
            </Card.Link>
          )}
        </div>
      );
    }
  }

  renderList = () => {
    const data = _.chunk(this.state.data, 4);
    return data.map(item => {
      return (
        <Form.Group as={Row}>
          {item.map(element => (
            <Item item={element} getFile={this.getDiplomaFile} />
          ))}
        </Form.Group>
      );
    });
  };
  render() {
    return (
      <div style={{ paddingLeft: 20, paddingTop: 10 }}>
        {this.renderList()}
        <Loading
          url="/diploma/all-diploma"
          onSuccess={this.getListDiplomaSuccess}
          onError={this.getListDiplomaError}
          autoLoading
        />
        <Loading
          url="/diploma/get-diploma-info"
          ref={this.loadingGetFile}
          onSuccess={this.getFileSuccess}
          onError={this.getFileError}
          method="POST"
        />
        <Modal ref={this.modal}>{this.renderModal()}</Modal>
      </div>
    );
  }
}
