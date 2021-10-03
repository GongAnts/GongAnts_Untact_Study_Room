import React from 'react';
import { Card, Row, Col } from 'antd';
import TextField from '@mui/material/TextField';

function Memo() {
  return (
    <>
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <Card hoverable={true}>
              <TextField
                id="standard-basic"
                label="Write Memo"
                variant="standard"
                sx={{ m: 1, width: '30ch' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Memo;
