// @flow
/* eslint-disable */
import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import ScaleLoader from 'react-spinners/ScaleLoader';

// Colors
// import * as colors from '../../../styles/utilities/_variables.scss';
const colors = {
  green: '#65B042',
  grey: '#cccccc',
}

type Props = {
  value: Array;
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

const RangeSlider = (props: Props) => {
  const { value } = props;
  const isBottomScale = value[0] === 0;
  const isSmallScale = value[0] <= 4;
  const data = value < 100 ? [value] : [0];

  return (
    data ? (
      <div className="rangeSlider-wrap">
        <Range
          values={data}
          step={STEP}
          min={MIN}
          max={MAX}
          disabled
          onChange={(values) => ({ values })}
          renderTrack={({ props, children }) => (
            <div
              className={isBottomScale ? 'renderTrack renderTrackBottom' : 'renderTrack'}
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{ ...props.style }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '2px',
                  width: '100%',
                  background: getTrackBackground({
                    values: data,
                    colors: [colors.grey, colors.grey],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
              {isBottomScale || isSmallScale ? null : <div className="chartLabel zero">0</div>}
              <div className="chartDash first" />
              <div className="chartDash second" />
              <div className="chartDash third" />
              <div className="chartLabel hundred">100</div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className={isBottomScale ? 'renderThumb renderThumbBottom' : 'renderThumb'}
              style={{ ...props.style }}
            >
              <div className="renderThumb-value">
                {data[0]}
              </div>
              <div
                style={{
                  height: isBottomScale ? '100%' : '10px',
                  width: '3px',
                  backgroundColor: colors.green,
                }}
              />
            </div>
          )}
        />
      </div>
    ) : (
      <ScaleLoader
        css="margin-left: 10px"
        size={150}
        color={colors.green}
        loading
      />
    )
  );
};
export default RangeSlider;
