import React from 'react';
import { Alert, Button } from 'react-bootstrap';
export default class Error extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }
  onShow = () => {
    this.setState({ show: true });
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
            <p>{'Đã xảy ra lỗi vui lòng thử lại'}</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={this.onHide} variant="outline-error">
                Thử lại
              </Button>
            </div>
          </Alert>
        </div>
      );
    }
    return null;
  }
}
