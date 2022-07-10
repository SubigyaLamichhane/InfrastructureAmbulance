import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Map from '../../components/Map';
import { StoreStateI } from '../../store/reducers';
import { setYellowDotMarker } from '../../utils/getMap';

interface ComplainHelperProps {
  latitude: number;
  longitude: number;
  isMapLoaded: boolean;
}

const ComplainHelper: React.FC<ComplainHelperProps> = ({
  isMapLoaded,
  latitude,
  longitude,
}) => {
  useEffect(() => {
    if (isMapLoaded) {
      setYellowDotMarker(latitude, longitude);
    }
  });
  return <div className="">{<Map></Map>}</div>;
};

const mapStateToProps = (state: StoreStateI, _: any) => {
  return { isMapLoaded: state.mapLoadedForm.isMapLoaded };
};

export default connect(mapStateToProps, {})(ComplainHelper) as any;
