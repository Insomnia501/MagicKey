import { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';

const StyledTimerItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
const StyledTimerZone = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '32px',
  alignItems: 'center',
  justifyContent: 'space-around',
}));
const StyledTimerTimeItem = styled('p')(({ theme }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#EFEFF3',
  color: '#000000',
  fontSize: '16px',
  fontWeight: 400,
  textAlign: 'center',
  borderRadius: '4px',
  lineHeight: '32px',
}));
const StyledTimerTextItem = styled('p')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '8px',
  color: '#CFCFD7',
  fontSize: '12px',
  lineHeight: '14px',
  fontWeight: 400,
}));
const StyledTimerMargin = styled('p')(({ theme }) => ({
  color: '#9898A7',
  height: '32px',
  paddingLeft: '5px',
  paddingRight: '5px',
  fontSize: '12px',
  fontWeight: 400,
}));
export default function TimerComponent(data: any) {
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(1);
  const setSchedule = useRef(false);

  const { time } = data;

  useEffect(() => {
    if (!setSchedule.current) {
      setSchedule.current = true;
      setInterval(() => {
        const interval = time - Date.now() / 1000;
        setDay(Math.floor(interval / 60 / 60 / 24));
        setHour(Math.floor((interval / 60 / 60) % 24));
        setMinute(Math.floor((interval / 60) % 60));
        setSecond(Math.floor(interval % 60));
      }, 1000);
    }
  });

  return (
    <StyledTimerZone>
      {getTimerItem(day, 'Day')}
      <StyledTimerMargin>:</StyledTimerMargin>
      {getTimerItem(hour, 'Hour')}
      <StyledTimerMargin>:</StyledTimerMargin>
      {getTimerItem(minute, 'Min')}
      <StyledTimerMargin>:</StyledTimerMargin>
      {getTimerItem(second, 'Sec')}
    </StyledTimerZone>
  );

  function getTimerItem(num: number, date: string) {
    return (
      <StyledTimerItem>
        <StyledTimerTimeItem>{num}</StyledTimerTimeItem>
        <StyledTimerTextItem>{date}</StyledTimerTextItem>
      </StyledTimerItem>
    );
  }
}
