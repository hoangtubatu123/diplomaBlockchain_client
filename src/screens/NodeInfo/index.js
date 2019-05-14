import React from "react";
import { Table } from "react-bootstrap";
import "./style.css";
import Loading from "../../components/Loading";
export default class NodeInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: { name: "Cường", School: "Đại học bách khoa hà nội" }
    };
  }
  getInfoSuccess = response => {
    // console.log(response);
    this.setState({ data: response.data });
  };
  getInfoError = error => {
    // console.log(error);
    alert(JSON.stringify(error));
  };

  renderInfo = () => {
    if (this.state.data) {
      return Object.keys(this.state.data).map(item => {
        return (
          <tr>
            <td>{item}</td>
            <td>{this.state.data[item]}</td>
          </tr>
        );
      });
    }
    return null;
  };
  render() {
    return (
      <div class="row">
        <div
          class="col-sm-6"
          style={{
            marginTop: 100,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Đặc điểm</th>
              </tr>
            </thead>
            <tbody>{this.renderInfo()}</tbody>
          </Table>
        </div>
        <Loading
          url="/info/getInfo"
          autoLoading
          onSuccess={this.getInfoSuccess}
          onError={this.getInfoError}
        />
      </div>
    );
  }
}
