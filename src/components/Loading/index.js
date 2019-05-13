import React from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import constants from '../../constants';

export default class Loading extends React.Component {
  static defaultProps = {
    method: 'GET'
  };
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    const { autoLoading } = this.props;
    if (autoLoading) {
      this.requestAPI();
    }
  }
  requestAPI = () => {
    const { onSuccess, onError, url, params, method } = this.props;
    this.setState({ isLoading: true });
    axios({
      method: method,
      headers: { 'content-type': 'application/json' },
      url: constants.BASE_URL + url,
      data: params
    })
      .then(response => {
        this.setState({ isLoading: false });
        onSuccess && onSuccess(response);
      })
      .catch(error => {
        this.setState({ isLoading: false });
        onError && onError(error);
      });
  };
  render() {
    if (this.state.isLoading) {
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
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    return null;
  }
}
