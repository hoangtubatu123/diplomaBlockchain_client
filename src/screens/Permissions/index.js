import React from "react";
import { Table, Form, Button, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Success from "../../components/Success";
const listPerms = [
  "connect",
  "send",
  "receive",
  "create",
  "issue",
  "mine",
  "activate",
  "admin"
];
export default class Permission extends React.Component {
  constructor() {
    super();
    this.grantAccount = React.createRef();
    this.revokeAccount = React.createRef();
    this.grants = {};
    this.revoke = {};
    this.error = React.createRef();
    this.success = React.createRef();
    this.state = {
      data: []
    };
  }

  getPermissionSuccess = response => {
    this.setState({ data: response.data });
  };
  getPermissionError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  checkAdmin = () => {
    if (this.state.data.length !== 0) {
      const permissions = this.state.data.filter(item => item.type === "admin");
      if (permissions.length !== 0) {
        return true;
      }
    }
    return false;
  };
  grant = e => {
    if (!this.address.value || Object.keys(this.grants).length === 0) {
      alert("Bạn chưa nhập đủ thông tin");
      return;
    }
    if (this.grantAccount && this.grantAccount.current) {
      let permissions = [];
      Object.keys(this.grants).forEach(item => {
        if (this.grants[item].checked) {
          permissions.push(item);
        }
      });
      const params = {
        address: this.address.value,
        permissions: JSON.stringify(permissions)
      };
     
      this.grantAccount.current.requestAPI(params);
    }
  };
  revokeFunction = e => {
    if (!this.address.value || Object.keys(this.revoke).length === 0) {
      return alert("Bạn chưa nhập đủ thông tin");
    }
    if (this.revokeAccount && this.revokeAccount.current) {
      let permissions = [];
      Object.keys(this.revoke).forEach(item => {
        if (this.revoke[item].checked) {
          permissions.push(item);
        }
      });
      const params = {
        address: this.address.value,
        permissions: JSON.stringify(permissions)
      };
      console.log(params);
      this.revokeAccount.current.requestAPI(params);
    }
  };
  onSuccessGrantRevoke = () => {
    if (this.success && this.success.current) {
      this.success.current.onShow();
    }
  };
  onErrorGrantRevoke = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  renderListPermission = type => {
    return (
      <Form.Group>
        {listPerms.map(item => {
          return (
            <Form.Check
              type="checkbox"
              label={item}
              ref={ref => {
                if (type === "grant") {
                  this.grants = { ...this.grants, ...{ [item]: ref } };
                } else {
                  this.revoke = { ...this.revoke, ...{ [item]: ref } };
                }
              }}
            />
          );
        })}
      </Form.Group>
    );
  };
  renderGrantOrRevoke = () => {
    if (this.checkAdmin()) {
      return (
        <div
          class="col-sm-5"
          style={{
            marginTop: 100,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <Form.Control
            placeholder="Địa chỉ ví cần cấp quyền(tước quyền)"
            ref={ref => (this.address = ref)}
          />
          <div style={{ marginTop: 30 }}>
            <h4>Cấp quyền địa chỉ</h4>
            {this.renderListPermission("grant")}
            <Button
              variant="primary"
              onClick={e => {
                this.grant(e);
              }}
            >
              Cấp quyền
            </Button>
            <h4>Tước quyền địa chỉ</h4>
            {this.renderListPermission("revoke")}
            <Button
              variant="primary"
              onClick={e => {
                this.revokeFunction(e);
              }}
            >
              Tước quyền
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  renderInfo = () => {
    if (this.state.data.length !== 0) {
      let str = "";
      this.state.data.forEach(item => {
        str += `${item.type}, `;
      });
      let data = { address: this.state.data[0].address, permissions: str };

      return Object.keys(data).map(item => {
        return (
          <tr>
            <td>{item}</td>
            <td>{data[item]}</td>
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
        {this.renderGrantOrRevoke()}
        <Loading
          url="/info/listPerm"
          autoLoading
          onSuccess={this.getPermissionSuccess}
          onError={this.getPermissionError}
        />
        <Loading
          url="/info/grant"
          onSuccess={this.onSuccessGrantRevoke}
          onError={this.onErrorGrantRevoke}
          ref={this.grantAccount}
          method="POST"
        />
        <Loading
          url="/info/revoke"
          onSuccess={this.onSuccessGrantRevoke}
          onError={this.onErrorGrantRevoke}
          ref={this.revokeAccount}
          method="POST"
        />
        <Error ref={this.error} />
        <Success ref={this.success} />
      </div>
    );
  }
}
