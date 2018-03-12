import * as React from 'react';

export interface Props {
  elapsedTime: number;
}

function ElapsedTime({ elapsedTime }: Props) {
  const { hours, minutes, seconds } = getTimeUnits(elapsedTime);
  return (
    <div style={{ margin: '5px' }}>
      <span>{padLeft(hours)}:</span>
      <span>{padLeft(minutes)}:</span>
      <span>{padLeft(seconds)}</span>
    </div>
  );
}

function padLeft(value: string) {
  return ('0' + value).slice(-2);
}

function getTimeUnits(timeInSeconds: number) {
  return {
    hours: Math.floor(timeInSeconds / 3600).toString(),
    minutes: Math.floor((timeInSeconds / 60) % 60).toString(),
    seconds: Math.floor((timeInSeconds % 60) % 60).toString()
  };
}
export default ElapsedTime;