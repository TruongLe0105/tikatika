import React from "react";
import moment from "moment";

export const useCountDown = (
  timeToCount = 30,
  interval = 1000
): [number, (ts?: number) => void, () => void] => {
  const [timeLeft, setTimeLeft] = React.useState(timeToCount);
  let timer: NodeJS.Timeout;

  const run = () => {
    timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 0) {
          clearInterval(timer);

          return 0;
        }

        return current - interval / 1000;
      });
    }, interval);
  };

  const start = React.useCallback(
    (ttc) => {
      clearInterval(timer);

      const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
      setTimeLeft(newTimeToCount);

      run();
    },
    [timer, setTimeLeft]
  );

  const clear = React.useCallback(() => {
    clearInterval(timer);
  }, [timer]);

  return [timeLeft, start, clear];
};
