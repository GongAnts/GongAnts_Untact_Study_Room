import React from "react";
// import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { RightOutlined, UserOutlined } from '@ant-design/icons';

function Dashboard() {
  return (
    <>
      <Container fluid>
      <Row>
          <Col md="7">
            <Card>
              <Card.Header>
                <Card.Title as="h3"><mark>공부 시간 기록</mark></Card.Title>
              </Card.Header>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  내 기록 <i className="fas fa-circle text-danger"></i>
                  사용자 평균
                </div>
                <hr></hr>
                <div className="stats">
                  <RightOutlined />
                  &nbsp; 더보기
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="5">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3" className="mb-2">방 목록</Card.Title>
                <p className="card-category">
                  공부 시간이 많은 방 목록입니다.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>방 이름</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>뭘로 하지</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>글쎄</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <div>
                  <UserOutlined style={{fontSize: '2em'}} />
                  유저 이름
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  follow
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
