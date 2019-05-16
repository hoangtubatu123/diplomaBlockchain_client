import React from 'react';
import { Table } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import _ from 'lodash';
export default class Permission extends React.Component {
  constructor() {
    super();
    this.error = React.createRef();
    this.state = {
      data: null
    };
  }
  getPermissionSuccess = response => {
    const data = _.groupBy(response.data, 'address');
    this.setState({ data: data });
  };
  getPermissionError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  checkAdmin = () => {
    if (this.state.data) {
      const keys = Object.keys(this.state.data);
      const permissions = this.state.data[keys[0]].filter(
        item => item.type === 'admin'
      );
      if (permissions.length !== 0) {
        return true;
      }
    }
    return false;
  };

  renderInfo = () => {
    if (this.state.data) {
      return Object.keys(this.state.data).map(item => {
        let permission = '';
        this.state.data[item].map(item => {
          permission += item.type;
        });
        return (
          <tr>
            <tr>
              <td>{'Address'}</td>
              <td>{item}</td>
            </tr>
            <tr>
              <td>{'Permission'}</td>
              <td>{permission}</td>
            </tr>
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
            marginTop: 70,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <h4>Quyền hạn của node</h4>
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
            marginTop: 70,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <h4>Quyền hạn của node</h4>
        </div>
        <Loading
          url="/info/listPerm"
          autoLoading
          onSuccess={this.getPermissionSuccess}
          onError={this.getPermissionError}
        />

        <Error ref={this.error} />
      </div>
    );
  }
}
