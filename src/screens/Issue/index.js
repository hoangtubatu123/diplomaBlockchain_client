import React from 'react';
import './styles.css';
import { Form, Col, Button } from 'react-bootstrap';
import Loading from '../../components/Loading';
export default class Issue extends React.Component {
  constructor() {
    super();
    this.loading = React.createRef();
    this.download = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const params = {
      nameDiploma: this.nameDiploma.value || '',
      issueSource: this.issueSource.value || '',
      nameStudent: this.nameStudent.value || '',
      date: this.date.value || '',
      expire: this.year.value || '',
      readingPoint: this.readingPoint.value || '',
      listeningPoint: this.readingPoint.value || '',
      totalPoint: this.totalPoint.value || '',
      address: this.address.value || ''
    };
    if (this.loading && this.loading.current) {
      this.loading.current.requestAPI(params);
    }
  };
  onSuccess = response => {};
  onError = error => {
    alert(JSON.stringify(error));
  };
  render() {
    return (
      <div class="row">
        <div
          class="col-sm-6"
          style={{
            marginTop: 50,
            paddingLeft: 30,
            paddingRight: 10
          }}
        >
          <div class="container">
            <Form>
              <Form.Group>
                <Form.Label>Tên chứng chỉ</Form.Label>
                <Form.Control
                  placeholder="Toeic"
                  ref={ref => (this.nameDiploma = ref)}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Người phát hành</Form.Label>
                  <Form.Control
                    placeholder="Người phát hành"
                    ref={ref => (this.issueSource = ref)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Họ tên sinh viên</Form.Label>
                  <Form.Control
                    placeholder="Họ tên"
                    ref={ref => (this.nameStudent = ref)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Tốt nghiệp</Form.Label>
                <Form.Control
                  placeholder="11/12/2018"
                  ref={ref => (this.date = ref)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Thời hạn</Form.Label>
                <Form.Control
                  placeholder="2 năm"
                  ref={ref => (this.year = ref)}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Reading</Form.Label>
                  <Form.Control
                    placeholder="400"
                    ref={ref => (this.readingPoint = ref)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Listening</Form.Label>
                  <Form.Control
                    placeholder="400"
                    ref={ref => (this.listeningPoint = ref)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Tổng điểm</Form.Label>
                  <Form.Control
                    placeholder="400"
                    ref={ref => (this.totalPoint = ref)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Địa chỉ ví</Form.Label>
                <Form.Control
                  placeholder="địa chỉ ví"
                  ref={ref => (this.address = ref)}
                />
              </Form.Group>
              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={e => {
                  this.onSubmit(e);
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <Loading
          url="/diploma/create-diploma"
          ref={this.loading}
          onSuccess={this.onSuccess}
          onError={this.onError}
          method="POST"
        />
        <Loading url="/diploma/download" ref={this.download} invisible />
      </div>
    );
  }
}
