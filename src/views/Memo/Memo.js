import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button } from 'antd';
import { MEMO_LIST_REQUEST, MEMO_DELETE_REQUEST } from 'redux/types';

function Memo() {
  const { memo } = useSelector((state) => state.memo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: MEMO_LIST_REQUEST,
    });
  }, []);

  const memoList = memo
    ? memo.map((item, index) => {
        return (
          <Col span={8} key={index}>
            <Card hoverable={true}>
              {item.memo_title}
              <p>
                {item.memo_date.slice(0, 4)}, {item.memo_date.slice(5, 7)},{' '}
                {item.memo_date.slice(8, 10)}
              </p>
              <p dangerouslySetInnerHTML={{ __html: item.memo_content }}></p>
              <Link to={`/admin/memo/${item.memo_id}/edit`}>
                <Button>수정하기</Button>
              </Link>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: MEMO_DELETE_REQUEST,
                    payload: item.memo_id,
                  });
                }}
              >
                삭제하기
              </Button>
            </Card>
          </Col>
        );
      })
    : '';

  return (
    <>
      <div>
        <a href="/admin/memo/write" style={{ marginBottom: '10px' }}>
          <Button type="primary">메모하기</Button>
        </a>
        {memoList}
      </div>
    </>
  );
}

export default Memo;
