import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import MapTitle from '../../atoms/MapTitle';

// Colors
import * as colors from '../../../styles/utilities/_variables.scss';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

type Props = {
  geoMarkers?: Array,
}

const Map = (props: Props) => {
  const { geoMarkers } = props;
  const markers = geoMarkers || [];

  return (
    <div className="map-wrap">
      <MapTitle title="Live Smeshers" toolTipMessage="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." />
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 230,
        }}
        style={{
          width: '100%',
          height: '355px',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies
            .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colors.mapGeographiesFill}
                stroke={colors.mapGeographiesStroke}
              />
            ))}
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default Map;
