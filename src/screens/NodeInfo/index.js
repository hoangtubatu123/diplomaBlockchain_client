import React from 'react';
import { Table } from 'react-bootstrap';
import './style.css';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
export default class NodeInfo extends React.Component {
  constructor() {
    super();
    this.error = React.createRef();
    this.state = {
      data: { name: 'Cường', School: 'Đại học bách khoa hà nội' },
      addresses: []
    };
  }
  getAddressSuccess = response => {
    this.setState({ addresses: response.data });
  };
  getAddressError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };

  getInfoSuccess = response => {
    this.setState({ data: response.data });
  };
  getInfoError = error => {
    alert(JSON.stringify(error));
  };

  renderAddresses = () => {
    if (this.state.addresses.length !== 0) {
      return this.state.addresses.map((index, item) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item}</td>
          </tr>
        );
      });
    }
    return null;
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
          <h4>Thông tin của node</h4>
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
        <div
          class="col-sm-6"
          style={{
            marginTop: 100,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <h4>Thông tin ví</h4>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Đặc điểm</th>
              </tr>
            </thead>
            <tbody>{this.renderAddresses()}</tbody>
          </Table>
        </div>
        <Loading
          url="/info/getInfo"
          autoLoading
          onSuccess={this.getInfoSuccess}
          onError={this.getInfoError}
        />
        <Loading
          url="/info/address"
          autoLoading
          onSuccess={this.getAddressSuccess}
          onError={this.getAddressError}
          invisible
        />
        <Error ref={this.error} />
      </div>
    );
  }
}
