import React, { createRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WriteArea } from './styles';
import { Button, Input } from 'antd';

// Editor
import { Editor } from '@toast-ui/react-editor';
import { MEMO_EDIT_REQUEST, MEMO_UPDATE_REQUEST } from 'redux/types';

function MemoEdit(req) {
  const { memo_title, memo_content } = useSelector((state) => state.memo);
  const [form, setForm] = useState({
    memo_title: `${memo_title}`,
    memo_content: `${memo_content}`,
  });
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
    const memo_id = req.match.params.id;
    const { memo_title, memo_content } = form;
    let data = {
      memo_id,
      memo_title,
      memo_content,
    };

    dispatch({
      type: MEMO_UPDATE_REQUEST,
      payload: data,
    });
  };

  useEffect(() => {
    dispatch({
      type: MEMO_EDIT_REQUEST,
      payload: req.match.params.id,
    });
  }, [req.match.params.id]);

  return (
    <>
      <WriteArea className="fixed-bottom">
        <Input
          id="memo_title"
          name="memo_title"
          placeholder="메모 제목을 입력하세요."
          onChange={onChange}
          defaultValue={form.memo_title}
        />
        <Editor
          previewStyle="vertical"
          height="250px"
          initialEditType="wysiwyg"
          ref={editorRef}
          onChange={onEditorChange}
          defaultValue={form.memo_content}
        />
        <Button
          onClick={onSubmit}
          type="primary"
          style={{ width: '100%', marginTop: '15px' }}
        >
          수정하기
        </Button>
      </WriteArea>
    </>
  );
}

export default MemoEdit;
