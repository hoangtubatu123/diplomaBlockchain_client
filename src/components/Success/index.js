import React from 'react';
import { Alert, Button } from 'react-bootstrap';
export default class Success extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      message: ''
    };
  }
  onShow = message => {
    if (message) {
      this.setState({ show: true, message: message });
    } else {
      this.setState({ show: true });
    }
  };
  onHide = () => {
    this.setState({ show: false });
  };
  render() {
    if (this.state.show) {
      return (
        <div
          style={{
            zIndex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}
        >
          <Alert variant="success">
            <Alert.Heading>Thông báo</Alert.Heading>
            <p>{'Thành công'}</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={this.onHideError} variant="outline-success">
                Quay lại trang chủ
              </Button>
            </div>
          </Alert>
        </div>
      );
    }
  }
}
