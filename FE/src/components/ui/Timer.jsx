import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

///https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
const Timer = ({ duration = 90, rejectDestination = 'forgotPassword' }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState('00:00:00');
  const Ref = useRef(null);

  let deadline = new Date();

  deadline.setSeconds(deadline.getSeconds() + duration);

  // The state for our timer

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    } else {
      navigate(`/${rejectDestination}`);
    }
  };

  const clearTimer = (e) => {
    // setTimer('01:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  useEffect(() => {
    clearTimer(deadline);
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return <>{timer}</>;
};

export default Timer;

Timer.propTypes = {
  duration: PropTypes.number,
  rejectDestination: PropTypes.string,
};
