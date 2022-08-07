import React, { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';

import { LeftOutlined } from '@ant-design/icons';

// Date //
import Datepicker from 'views/Calendar/Datepicker';
import moment from 'moment';

function CalendarEditModal(props) {
  const [date, setDate] = useState(
    moment().format().split(':')[0] + ':' + moment().format().split(':')[1],
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);

  const outSection = useRef();
  useOnClickOutside(outSection, () => {
    props.setOpenModal(false);
  });

  return (
    <div>
      <input
        type="checkbox"
        id={`modal${props.idx}`}
        className="modal-toggle"
      />
      <label for={`modal${props.idx}`} className="modal">
        <label className="modal-box relative" for="">
          <div className="flex align-middle flex-col h-64 items-center">
            <div className="flex mt-2 items-center w-56">
              <LeftOutlined
                className="flex-0"
                onClick={() => {
                  props.setOpenModal(false);
                }}
              />
              <div className="flex-2 text-xl px-14">일정 보기</div>
            </div>
            <div className="flex flex-col pt-3 items-center justify-space w-2/5">
              {props.schedule_title}
              {props.schedule_date}
              {props.schedule_description}
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default CalendarEditModal;
