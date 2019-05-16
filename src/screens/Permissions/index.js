import React from 'react';
import { Table, Form } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
const listPerms = [
  'connect',
  'send',
  'receive',
  'create',
  'issue',
  'mine',
  'activate',
  'admin'
];
export default class Permission extends React.Component {
  constructor() {
    super();
    this.error = React.createRef();
    this.state = {
      data: []
    };
  }
  getPermissionSuccess = response => {
    this.setState({ data: response });
  };
  getPermissionError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  checkAdmin = () => {
    if (this.state.data.length === 0) {
      const permissions = this.state.data.filter(item => item.type === 'admin');
      if (permissions.length !== 0) {
        return true;
      }
    }
    return false;
  };
  renderListPermission =() => {
    return (
      
    )
  }
  renderGrantOrRevoke =() => {
     
  }

  renderInfo = () => {
    if (this.state.data.length !== 0) {
      let str = '';
      this.state.data.map(item => {
        str += `${item.type}, `;
      });
      return (
        <tr>
          <tr>
            <td>{'Addresss'}</td>
            <td>{this.state.data[0].address}</td>
          </tr>
          <tr>
            <td>{'Quyền truy cập'}</td>
            <td>{str}</td>
          </tr>
        </tr>
      );
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

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="" />
          </Form.Group>
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
