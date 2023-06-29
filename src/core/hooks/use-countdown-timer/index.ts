import { useEffect, useRef, useState } from 'react';
import { useAppStateEffect } from '@core/hooks';

/**
 * Types
 */
interface CountdownTimerResult {
  timer: string;
  onTime: boolean;
  resetTimer: () => void;
}

/**
 * Constants
 */

const TIMER_INTERVAL_IN_MILISECONDS = 1000;
const TIME_TO_SECONDS_CONVERSION_FACTOR = 1000;
const PADDING_LENGTH = 2;

/**
 * Hooks
 */

export const useCountdownTimer = (seconds: number): CountdownTimerResult => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const [backgroundTime, setBackgroundTime] = useState<number>(0);
  const timer = useRef(setInterval(() => {}, 0));

  const resetTimer = (): void => {
    setTimeLeft(seconds);
  };

  useAppStateEffect(status => {
    let diff;

    if (status === 'background') {
      setBackgroundTime(Date.now());
    }

    if (status === 'active' && backgroundTime) {
      diff = Math.round(
        (Date.now() - backgroundTime) / TIME_TO_SECONDS_CONVERSION_FACTOR,
      );
    }

    setTimeLeft(timeLeft - (diff || 0));
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(0);
    }

    if (!timeLeft) {
      return undefined;
    }

    timer.current = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, TIMER_INTERVAL_IN_MILISECONDS);

    return () => clearInterval(timer.current);
  }, [timeLeft]);

  return {
    timer: timeLeft.toString().padStart(PADDING_LENGTH, '0'),
    onTime: !!timeLeft,
    resetTimer,
  };
};
