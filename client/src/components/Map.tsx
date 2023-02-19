import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreStateI } from '../store/reducers';
import {
  GetMap,
  resetMap,
  setMapOnClickEventHandler,
  setPointerMarker,
  setYellowDotMarker,
} from '../utils/getMap';

interface MapProps {
  isMapLoaded: boolean;
}

const conditionalMapLoading = (isMapLoaded: boolean) => {
  if (!isMapLoaded) {
    return (
      <Script
        onLoad={() => {
          GetMap(85.32767705161245, 27.705308474955412);
        }}
        type="text/javascript"
        src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"
      ></Script>
    );
  }
};

const Map: React.FC<MapProps> = ({ isMapLoaded }) => {
  const router = useRouter();
  useEffect(() => {
    if (isMapLoaded) {
      GetMap(85.32767705161245, 27.705308474955412);
      if (router.asPath.includes('create-complain')) {
        setMapOnClickEventHandler();
      }
    }
    setYellowDotMarker(85.323323, 27.3224234);
  });

  return (
    <div>
      {conditionalMapLoading(isMapLoaded)}

      <div
        id="myMap"
        style={{
          width: '600px',
          height: '500px',
        }}
      ></div>
    </div>
  );
};

const mapStateToProps = (state: StoreStateI, _: any) => {
  return { isMapLoaded: state.mapLoadedForm.isMapLoaded };
};

export default connect(mapStateToProps, {})(Map) as any;
