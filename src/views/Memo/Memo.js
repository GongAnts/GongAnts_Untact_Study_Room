import React, { createRef, useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

import { WriteArea } from './styles';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function Memo() {
  const [form, setForm] = useState({
    contents: '',
  });
  const dispatch = useDispatch();
  const editorRef = createRef();

  const onEditorChange = () => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      contents: val,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { contents } = form;
    let data = {
      contents
    }

  };

  return (
    <>
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <Card hoverable={true}>
              메모
            </Card>
          </Col>
        </Row>
        <WriteArea className="fixed-bottom">
          <Editor
            previewStyle="vertical"
            height="250px"
            initialEditType="wysiwyg"
            ref={editorRef}
            onChange={onEditorChange}
          />
          <Button onClick={onSubmit} type="primary" style={{ width: '100%' }}>
            글쓰기
          </Button>
        </WriteArea>
      </div>
    </>
  );
}

export default Memo;
