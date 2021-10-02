import styled from 'styled-components';

// Calendar js //
export const CalendarWrap = styled.div`
  position: relative;
`;

export const Header = styled.div`
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
  font-size: 1.5em;

  & > span {
    margin: 0 100px;
  }
  & > .month {
    font-size: 1.8em;
  }
  & > .arrow {
    color: #cccccc;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const DateBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
`;

export const Weekend = styled.div`
  display: flex;
`;

export const DOTW = styled.div`
  border-bottom: 1px solid gray;
  width: 14.2%;
  height: 35px;
  text-align: center;
`;

// Day js //

export const DayItem = styled.div`
  padding-top: 4px;
  height: 12vh;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;
