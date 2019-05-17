import React from 'react';
import { Form, Row } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Success from '../../components/Success';
import Item from './Item';
import _ from 'lodash';
export default class ListDiploma extends React.Component {
  constructor() {
    super();
    this.error = React.createRef();
    this.success = React.createRef();
    this.loadingGetFile = React.createRef();
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modal: false,
      link: ''
    };
  }
  getListDiplomaSuccess = response => {
    this.setState({ data: response.data });
  };
  getListDiplomaError = () => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };
  getDiplomaFile = item => {
    const params = { streamName: item.name };
    if (this.loadingGetFile && this.loadingGetFile.current) {
      this.loadingGetFile.current.requestAPI(params);
    }
  };
  getFileSuccess = response => {
    this.setState({ link: response.data.link }, () => {
      this.setState({ modal: true });
    });
  };
  getFileError = error => {
    if (this.error && this.error.current) {
      this.error.current.onShow();
    }
  };

  renderList = () => {
    const data = _.chunk(this.state.data, 4);
    return data.map(item => {
      return (
        <Form.Group as={Row}>
          {item.map(element => (
            <Item item={item} getFile={this.getDiplomaFile} />
          ))}
        </Form.Group>
      );
    });
  };
  render() {
    return (
      <div style={{ paddingLeft: 20, paddingTop: 10 }}>
        {this.renderList()}
        <Loading
          url="/diploma/all-diploma"
          onSuccess={this.getListDiplomaSuccess}
          onError={this.getListDiplomaError}
        />
        <Loading
          url="/diploma/get-diploma-file"
          ref={this.loadingGetFile}
          onSuccess={this.getFileSuccess}
          onError={this.getFileError}
        />
      </div>
    );
  }
}
