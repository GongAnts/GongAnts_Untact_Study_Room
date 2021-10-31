import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import TextField from '@mui/material/TextField';

function Memo() {
  return (
    <>
      <div>
        <a href="/admin/memo/write">
          <Button type="primary">메모하기</Button>
        </a>
        <Row gutter={8}>
          <Col span={8}>
            <Card hoverable={true}>메모</Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Memo;
