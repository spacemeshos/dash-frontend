import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { nanoid } from 'nanoid';
import MapTitle from '../../atoms/MapTitle';
import Title from '../../atoms/Title';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

type Props = {
  geoMarkers?: Array,
  activeSmeshers?: number,
}

const Map = (props: Props) => {
  const { geoMarkers, activeSmeshers } = props;
  const markers = geoMarkers || [];
  const locationsCount = markers.length;
  const smeshers = activeSmeshers || 0;

  return (
    <div className="map-wrap">
      <MapTitle title="Live Smeshers" toolTipMessage="The map displays world locations of smeshers that opted-in to report geo location data back to Spacemesh. Each circle represents one active smesher at a specific world location, and the size of the circle is based on the amount of storage committed by that smesher." />
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
        }}
        style={{
          width: '100%',
          height: '355px',
        }}
      >
        <ZoomableGroup center={[0, 40]}>
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
            <Marker key={`${nanoid()}-${name}`} coordinates={coordinates}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="#AA58B1" />
              </svg>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="bottom-text-wrap">
        <Title text={`${smeshers} Smeshers in ${locationsCount} world locations`} />
      </div>
    </div>
  );
};

export default Map;
