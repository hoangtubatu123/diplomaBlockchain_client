import React from "react";
import "./style.css";
import $ from "jquery";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
import Error from "../../components/Error";
import { Button, Form, Table } from "react-bootstrap";
export default class Verification extends React.Component {
  constructor() {
    super();
    this.submit = React.createRef();
    this.success = React.createRef();
    this.error = React.createRef();
    this.state = {
      fileInfo: "",
      data: null
    };
  }
  chooseFile = e => {
    e.preventDefault();
    $("input").click();
  };
  onChangeFile = e => {
    this.setState({ fileInfo: e.target.files[0].name });
    this.file = e.target.files[0];
  };
  onSubmit = () => {
    if (!this.file || !this.idStudent.value || this.idStudent.value === "") {
      return alert("Bạn chưa nhập file hoặc mã số sinh viên");
    }
    let bodyFromData = new FormData();
    bodyFromData.append("file", this.file);
    bodyFromData.append("idStudent", this.idStudent.value);
    if (this.submit && this.submit.current) {
      this.submit.current.requestAPI(bodyFromData);
    }
  };
  upFileSuccess = response => {
    console.log(response);
    if (response && response.data && response.data.message) {
      if (this.error && this.error.current) {
        return this.error.current.onShow(
          response.data.message ||
            "Hồ sơ này không tồn tại trong dữ liệu, thử lại"
        );
      }
    }
    this.setState({ data: response.data.info }, () => {
      if (this.success && this.success.current) {
        this.success.current.onShow("Xác thực thành công");
      }
    });
  };
  upFileError = error => {
    this.setState({ data: null });
    if (this.error && this.error.current) {
      this.error.current.onShow(
        "Hồ sơ này không tồn tại trong dữ liệu, thử lại"
      );
    }
  };
  renderInfoDiploma = () => {
    if (this.state.data) {
      return (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Thông tin</th>
              <th>Đặc điểm</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(item => {
              return (
                <tr>
                  <td>{item}</td>
                  <td>{this.state.data[item]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
    return null;
  };
  render() {
    return (
      <div class="container">
        <h5>Yêu cầu nhập file</h5>

        <div class="input-container" style={{ marginTop: 10 }}>
          <input type="file" id="input" onChange={this.onChangeFile} />
          <button class="browse-btn" onClick={this.chooseFile}>
            Chọn File
          </button>
          <span class="file-info">{this.state.fileInfo}</span>
        </div>
        <Form.Group>
          <Form.Label>Mã số sinh viên</Form.Label>
          <Form.Control
            placeholder="mã số"
            ref={ref => (this.idStudent = ref)}
          />
        </Form.Group>
        <Button
          variant="dark"
          size="lg"
          style={{ marginTop: 50 }}
          onClick={this.onSubmit}
        >
          Submit
        </Button>
        <Loading
          ref={this.submit}
          url="/verification/checkValidate"
          onSuccess={this.upFileSuccess}
          onError={this.upFileError}
          isFormData
          method="POST"
        />
        {this.renderInfoDiploma()}
        <Error ref={this.error} />
        <Success ref={this.success} />
      </div>
    );
  }
}
