// @flow
import React from 'react';
import { Range, getTrackBackground } from "react-range";

type Props = {
  data: Array;
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

const RangeSlider = (props: Props) => {
  const { data } = props;

  return (
    <div className="rangeSlider-wrap">
      <Range
        values={ data }
        step={STEP}
        min={MIN}
        max={MAX}
        disabled
        onChange={values => ({ values })}
        renderTrack={({ props, children }) => (
          <div
            className="renderTrack"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{...props.style}}
          >
            <div
              ref={props.ref}
              style={{
                height: "2px",
                width: "100%",
                background: getTrackBackground({
                  values: data,
                  colors: ["#ccc", "#ccc"],
                  min: MIN,
                  max: MAX
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className="renderThumb"
            style={{...props.style}}
          >
            <div className="renderThumb-value">
              {data[0]}
            </div>
            <div
              style={{
                height: '10px',
                width: '2px',
                backgroundColor: isDragged ? '#65B042' : '#65B042'
              }}
            />
          </div>
        )}
      />
      <div style={{
        position: 'absolute',
        height: "10px",
        width: "2px",
        marginRight: '20px',
        display: "flex",
        backgroundColor: '#FFF',
        bottom: '21px',
        left: '50px',
      }} />
    </div>
  );
}
export default RangeSlider;
