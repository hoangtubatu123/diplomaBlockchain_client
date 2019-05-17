import React from 'react';
import { Alert, Button } from 'react-bootstrap';
export default class Error extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      message: ''
    };
  }
  onShow = message => {
    if (message) {
      this.setState({ message: message, show: true });
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
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {this.state.message === ''
                ? 'Đã xảy ra lỗi vui lòng thử lại'
                : this.state.message}
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={this.onHide} variant="outline-error">
                Quay lại trang chủ
              </Button>
            </div>
          </Alert>
        </div>
      );
    }
    return null;
  }
}
