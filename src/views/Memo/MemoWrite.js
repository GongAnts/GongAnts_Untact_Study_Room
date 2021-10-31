import React, { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input } from 'antd';
import { WriteArea } from './styles';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { MEMO_WRITE_REQUEST } from 'redux/types';

function MemoWrite() {
  const [form, setForm] = useState({
    memo_title: '',
    memo_content: '',
  });
  const { userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const editorRef = createRef();

  // Change
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onEditorChange = (e) => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      memo_content: val,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { memo_title, memo_content } = form;
    let data = {
      memo_title,
      memo_content,
      userName,
    };

    dispatch({
      type: MEMO_WRITE_REQUEST,
      payload: data,
    });
  };

  return (
    <>
      <WriteArea className="fixed-bottom">
        <Input
          id="memo_title"
          name="memo_title"
          placeholder="메모 제목을 입력하세요."
          onChange={onChange}
        />
        <Editor
          previewStyle="vertical"
          height="250px"
          initialEditType="wysiwyg"
          ref={editorRef}
          onChange={onEditorChange}
        />
        <Button
          onClick={onSubmit}
          type="primary"
          style={{ width: '100%', marginTop: '15px' }}
        >
          메모하기
        </Button>
      </WriteArea>
    </>
  );
}

export default MemoWrite;
