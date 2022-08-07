import React, { useRef } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';

function CalendarEditModal(props) {
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
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
}

export default CalendarEditModal;
