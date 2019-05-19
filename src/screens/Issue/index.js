import React from "react";
import "./styles.css";
import { Form, Col, Button } from "react-bootstrap";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
import Error from "../../components/Error";
export default class Issue extends React.Component {
  constructor() {
    super();
    this.loading = React.createRef();
    this.success = React.createRef();
    this.error = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const params = {
      nameDiploma: this.nameDiploma.value || "",
      issueSource: this.issueSource.value || "",
      nameStudent: this.nameStudent.value || "",
      idStudent: this.idStudent.value || "",
      date: this.date.value || "",
      expire: this.year.value || "",
      readingPoint: this.readingPoint.value || "",
      listeningPoint: this.readingPoint.value || "",
      totalPoint: this.totalPoint.value || "",
      publicKeyStudent: this.publicKeyStudent.value || ""
    };
    if (this.loading && this.loading.current) {
      this.loading.current.requestAPI(params);
    }
  };
  onSuccess = response => {
    if (this.success && this.success.current) {
      this.success.current.onShow("Tạo giấy chứng nhận thành công");
    }
  };
  onError = error => {
    if (this.error && this.error.current) {
      this.error.current.onShow(
        "Đã có lỗi xảy ra trong quá trình tạo giấy chứng nhận"
      );
    }
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
                <Form.Group as={Col}>
                  <Form.Label>Mã số</Form.Label>
                  <Form.Control
                    placeholder="Mã số sinh viên"
                    ref={ref => (this.idStudent = ref)}
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
                <Form.Label>Mã khóa sinh viên</Form.Label>
                <Form.Control
                  placeholder="mã khóa public"
                  ref={ref => (this.publicKeyStudent = ref)}
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
        <Success ref={this.success} />
        <Error ref={this.error} />
      </div>
    );
  }
}
