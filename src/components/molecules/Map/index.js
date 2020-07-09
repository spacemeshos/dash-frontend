import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import MapTitle from '../../atoms/MapTitle';
import Title from '../../atoms/Title';

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
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                />
              ))}
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="6" fill="#AA58B1" />
              </svg>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="bottom-text-wrap">
        <Title text="Note: User Min 100 GB GPU And Max 1TB GPU" />
      </div>
    </div>
  );
};

export default Map;
