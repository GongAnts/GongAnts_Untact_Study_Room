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
  width: 100%;
`;

export const DOTW = styled.div`
  border-bottom: 1px solid gray;
  width: 14.27%;
  height: 35px;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  left: 90%;
  top: 70vh;
  text-align: center;
  padding-bottom: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 150px;
  &:hover .subBtn {
    opacity: 1;
    visibility: visible;
    top: 0;
  }
  & > svg {
    cursor: pointer;
    border-radius: 50%;
    color: white;
    width: 50px;
    height: 50px;
    padding: 10px;
    &.filterBtn {
      background-color: pink;
      z-index: 1;
      transition: all 0.4s ease;
    }
    &.writeBtn {
      background-color: skyblue;
      z-index: 2;
      transition: all 0.5s ease;
    }
    &.menuBtn {
      background-color: #ffdb0d;
      z-index: 3;
    }
    &.subBtn {
      opacity: 0;
      visibility: hidden;
      top: 60px;
      position: relative;
    }
  }
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

  & > .day_title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 14%;
    height: 30px;
  }
`;

export const Plan = styled.span`
  text-align: center;
  //background-color: ${(props) => props.color};
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px 0;
  height: 20px;
  width: 100%;
  border-radius: 7px;
  background-color: #ff9aa3;
  color: white;
  cursor: pointer;
  &.completed {
    background-color: #bfbfbf;
  }
`;

// AddCalendar js //
export const Wrapper = styled.div`
  padding: 0 10px;
  height: 100vh;
  line-height: 100vh;
  vertical-align: middle;
  padding-top: 17vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: flex;
  background-color: white;
`;

export const Head = styled.div`
  background-color: white;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  font-size: 1.5em;
  & * {
    color: #cccccc;
    cursor: pointer;
  }
  @media screen and (min-width: 992px) {
    width: 30vw;
  }
`;

export const Body = styled.div`
  background-color: white;
  padding-top: 6vh;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* Mobile Device */
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 100vw;
  }
  /* Desktop Device */
  @media screen and (min-width: 992px) {
    width: 30vw;
  }
`;
