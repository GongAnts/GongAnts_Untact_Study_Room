import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Card, Radio, Divider } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
import { Content, ContentSecond, Title } from './styles';

import { TODO_LOAD_REQUEST } from 'redux/types';

function Todo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: TODO_LOAD_REQUEST,
    });
  }, []);

  return (
    <div>
      <h3 style={{ marginLeft: '40px' }}>My TodoList</h3>
      <Divider />

      <Content>
        <Title>
          <h5>🌑 미완료</h5>
          <SmallDashOutlined style={{ fontSize: '23px' }} />
        </Title>
        <Card
          size="small"
          hoverable
          style={{ width: 400, marginTop: '10px' }}
          cover={null}
        >
          <Radio style={{ marginTop: '18px' }}> 공개미 클라이언트</Radio>
        </Card>
        <Card
          size="small"
          hoverable
          style={{ width: 400, marginTop: '10px' }}
          cover={null}
        >
          <Radio style={{ marginTop: '18px' }}> 공개미 백엔드</Radio>
        </Card>
      </Content>
      <ContentSecond>
        <Title>
          <h5 style={{ marginRight: '310px' }}>🌕 완료</h5>
          <SmallDashOutlined style={{ fontSize: '23px' }} />
        </Title>

        <Card
          size="small"
          hoverable
          style={{ width: 400, marginTop: '10px' }}
          cover={null}
        >
          <Radio style={{ marginTop: '18px' }}> 공개미 배포 </Radio>
        </Card>
      </ContentSecond>
    </div>
  );
}

export default Todo;
