import React, { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';

import { LeftOutlined } from '@ant-design/icons';

// Date //
import Datepicker from 'views/Calendar/Datepicker';

// API //
import { SCHEDULE_UPDATE_REQUEST } from 'redux/types';

function CalendarEditModal({
  idx,
  setOpenModal,
  openModal,
  schedule_id,
  schedule_title,
  schedule_description,
  schedule_date,
}) {
  const [title, setTitle] = useState(`${schedule_title}`);
  const [description, setDescription] = useState(`${schedule_description}`);
  const [date, setDate] = useState(schedule_date.slice(0, 16));
  const [titleError, setTitleError] = useState(false);

  // 모달창 바깥 클릭 시 모달 닫히게
  const outSection = useRef();
  useOnClickOutside(outSection, () => {
    setOpenModal(false);
  });

  // 제목이 존재하는지 검사
  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return true;
    }
    return false;
  };

  // 스케줄 수정
  const dispatch = useDispatch();
  const onUpdate = () => {
    const yyyymmdd = date.split('T')[0].replaceAll('-', '');
    const time = date.split('T')[1].replaceAll(':', '');
    const data = { id: schedule_id, date: yyyymmdd, time, title, description };
    console.log(data);
    if (checkValid() === false) {
      dispatch({
        type: SCHEDULE_UPDATE_REQUEST,
        payload: data,
      });
    }
  };

  return (
    <div>
      <input type="checkbox" id={`modal${idx}`} className="modal-toggle" />
      <label for={`modal${idx}`} className="modal">
        <label className="modal-box relative" for="">
          <div className="flex align-middle flex-col h-100 items-center">
            <div className="flex mt-2 items-center w-56">
              <div
                className="flex-0 cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <LeftOutlined />
              </div>
              <div className="flex-2 text-xl px-14">일정 보기</div>
            </div>
            <div className="flex flex-col pt-3 items-center justify-space w-2/5">
              <Datepicker setDate={setDate} date={date} />
              <textarea
                className={`textarea ${titleError && 'textarea-error'}`}
                cols={30}
                value={title}
                placeholder="어떤 일정이 있나요?"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></textarea>
              {titleError ? (
                <p className="font-light text-xs">일정 제목을 입력해주세요</p>
              ) : (
                <></>
              )}
              <textarea
                className="textarea mt-4"
                placeholder="상세 메모"
                value={description}
                rows={5}
                cols={30}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <div className="flex mt-4">
                <button
                  className="btn btn-outline w-20 mx-1 inline"
                  // onClick={onUpdate}
                >
                  완료
                </button>
                <button
                  className="btn btn-outline w-20 mx-1"
                  onClick={onUpdate}
                >
                  수정
                </button>
                <button
                  class="btn btn-outline btn-warning w-20 mx-1"
                  // onClick={onUpdate}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default CalendarEditModal;
