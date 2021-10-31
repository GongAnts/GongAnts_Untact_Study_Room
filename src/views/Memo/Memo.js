import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button } from 'antd';
import { MEMO_LIST_REQUEST } from 'redux/types';

function Memo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: MEMO_LIST_REQUEST,
    });
  }, []);
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
