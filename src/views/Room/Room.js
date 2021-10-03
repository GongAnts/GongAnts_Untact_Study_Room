import React from 'react';

// react-bootstrap components
import { Badge, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { TodoArea } from './styles';

import { FaUserCircle } from 'react-icons/fa';
import { Checkbox, Card } from 'antd';

function Room() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2">
            <FaUserCircle style={{ fontSize: '9em' }} />
          </Col>
          <Col md="4">
            <Card title="To Do List" extra={<a href="#">More</a>}>
              <div className="mt-5 ms-5">
                <p>
                  <Checkbox onChange={onChange}>할 일1</Checkbox>
                </p>
              </div>
              <TodoArea>
                <TextField
                  id="standard-basic"
                  label="To do"
                  variant="standard"
                  placeholder="Wrtie To do"
                  sx={{ width: '27ch' }}
                />
                <Button type="primary" className="save mt-3">
                  저장
                </Button>
              </TodoArea>
            </Card>
          </Col>
          <Col md="2">
            <FaUserCircle style={{ fontSize: '9em' }} />
          </Col>
          <Col md="4">
            <Card title="To Do List" extra={<a href="#">More</a>}>
              <div className="mt-5 ms-5">
                <p>
                  <Checkbox onChange={onChange}>할 일1</Checkbox>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Room;
