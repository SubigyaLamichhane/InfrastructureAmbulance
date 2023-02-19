import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreStateI } from '../../store/reducers';
import { setYellowDotMarker } from '../../utils/getMap';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface ComplainHelperProps {
  latitude: number;
  longitude: number;
  isMapLoaded: boolean;
  complain: [
    {
      latitude: number;
      longitude: number;
      id: number;
      title: string;
      descriptionSnippet: string;
    }
  ];
}

const ComplainHelper: React.FC<ComplainHelperProps> = ({
  isMapLoaded,
  latitude,
  longitude,
  complain,
}) => {
  useEffect(() => {
    if (isMapLoaded) {
      setYellowDotMarker(latitude, longitude);
    }
  });
  return <div className="">{complain && <Map complains={complain}></Map>}</div>;
};

const mapStateToProps = (state: StoreStateI, _: any) => {
  return { isMapLoaded: state.mapLoadedForm.isMapLoaded };
};

export default connect(mapStateToProps, {})(ComplainHelper) as any;
