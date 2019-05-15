import React from "react";
import { Spinner } from "react-bootstrap";
import { normalAPI, formDataAPI } from "./API";
export default class Loading extends React.Component {
  static defaultProps = {
    method: "GET"
  };
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {
    const { autoLoading } = this.props;
    if (autoLoading) {
      this.requestAPI();
    }
  }
  requestAPI = (params) => {
    const { onSuccess, onError, url, method, isFormData } = this.props;
    this.setState({ isLoading: true });
    const config = {
      method: method,
      responseType: "json",
      url: url
    };
    if (params) {
      if (method === "POST") {
        config["data"] = params;
      } else {
        config["params"] = params;
      }
    }
    if (!isFormData) {
      return normalAPI(config)
        .then(res => {
          this.setState({ isLoading: false });
          onSuccess && onSuccess(res);
        })
        .catch(error => {
          this.setState({ isLoading: false });

          onError && onError(error);
        });
    } else {
      return formDataAPI(config)
        .then(res => {
          this.setState({ isLoading: false });
          onSuccess && onSuccess(res);
        })
        .catch(error => {
          this.setState({ isLoading: false });

          onError && onError(error);
        });
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <div
          style={{
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%"
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
