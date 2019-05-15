import React from "react";
import "./style.css";
import $ from "jquery";
import Loading from "../../components/Loading";
import { Button } from "react-bootstrap";
export default class Verification extends React.Component {
  constructor() {
    super();
    this.submit = React.createRef();
    this.state = {
      fileInfo: ""
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
    if (!this.file) {
      return alert("Bạn chưa nhập file");
    }
    let bodyFromData = new FormData();
    bodyFromData.append("file", this.file);
    if (this.submit && this.submit.current) {
      this.submit.current.requestAPI(bodyFromData);
    }
  };
  upFileSuccess = response => {
    alert("upfile Success");
    console.log(response.data);
  };
  upFileError = error => {
    alert(JSON.stringify(error));
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
          url="/verification/getFile"
          onSuccess={this.upFileSuccess}
          onError={this.onError}
          isFormData
          method="POST"
        />
      </div>
    );
  }
}
