import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreStateI } from '../store/reducers';
import {
  useMap,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  MapConsumer,
} from 'react-leaflet';
import {
  GetMap,
  resetMap,
  setMapOnClickEventHandler,
  setPointerMarker,
  setYellowDotMarker,
} from '../utils/getMap';
import L from 'leaflet';
import { isServer } from '../utils/isServer';
import 'leaflet/dist/leaflet.css';
import iconPerson from '../../public/Images/img_164074.svg';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import marker from '../../public/Images/marker.png';
import Image from 'next/image';

interface MapProps {
  isMapLoaded: boolean;
  complains: [
    {
      latitude: number;
      longitude: number;
      id: number | string;
      descriptionSnippet: string;
      title: string;
      description: string;
    }
  ];
  onClick: (e: any) => void;
  latlng: [number, number];
}

const conditionalMapLoading = (isMapLoaded: boolean) => {
  // const nextMarker = <Image src={marker} alt=></Image>;
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

const Markers = (onClick, latlng) => {
  const map = useMap();

  if (latlng[0] && latlng[1]) {
    return (
      <div>
        <TileLayer
          eventHandlers={{
            click: (e) => {
              onClick(e);
            },
          }}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={latlng}
          // @ts-ignore
          //icon={iconPerson}
          draggable={true}
          icon={
            new Icon({
              iconUrl:
                'https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [13, 41],
            })
          }
        ></Marker>
      </div>
    );
  }
};

const renderMap = (
  complains: [
    {
      latitude: number;
      longitude: number;
      id: number | string;
      title: string;
      descriptionSnippet: string;
      description: string;
    }
  ],
  latlng: [number, number],
  onClick: (e: any) => void
) => {
  if (isServer()) {
    return <div>Map</div>;
  }
  //@ts-ignore
  if (!isServer()) {
    if (complains[0].id === 'create-complain') {
      // console.log(latlng);
      return (
        <div>
          <MapContainer
            center={[27.705308474955412, 85.323323]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '80vh', width: '500px' }}
          >
            {/* <Markers onClick={onClick} latlng={latlng} /> */}
            <TileLayer
              eventHandlers={{
                click: (e) => {
                  onClick(e);
                },
              }}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {latlng[0] && (
              <Marker
                position={latlng}
                icon={
                  new Icon({
                    iconUrl:
                      'https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                  })
                }
              ></Marker>
            )}
            <MapConsumer>
              {(map) => {
                // console.log('map center:', map.getCenter());
                map.on('click', (e) => {
                  onClick(e);
                  // const { lat, lng } = e.latlng;
                  // L.marker([lat, lng], {
                  //   icon: new Icon({
                  //     iconUrl:
                  //       'https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png',
                  //     iconSize: [25, 41],
                  //     iconAnchor: [13, 41],
                  //   }),
                  // }).addTo(map);
                });

                return null;
              }}
            </MapConsumer>
          </MapContainer>
        </div>
      );
    }

    if (!complains[0].id) {
      return (
        <div>
          <MapContainer
            center={[27.705308474955412, 85.323323]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '80vh', width: '500px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div
              onClick={() => {
                console.log(complain.id);
              }}
            >
              <Marker
                position={[complains[0].longitude, complains[0].latitude]}
                // @ts-ignore
                //icon={iconPerson}
                eventHandlers={{
                  click: (e) => {
                    const element = document.getElementById(complain.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  },
                }}
                icon={
                  new Icon({
                    iconUrl:
                      'https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                  })
                }
              >
                <Popup>
                  <span className="block text-lg">{complains[0].title}</span>

                  <span className="block">{complains[0].description}</span>
                </Popup>
              </Marker>
            </div>
          </MapContainer>
        </div>
      );
    }
    return (
      <div>
        <MapContainer
          center={[27.705308474955412, 85.323323]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '80vh', width: '600px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {complains.length > 0 &&
            complains.map((complain) => {
              return (
                <div
                  key={complain.id}
                  onClick={() => {
                    console.log(complain.id);
                  }}
                >
                  <Marker
                    onClick={() => {
                      console.log(complain.id);
                    }}
                    position={[complain.longitude, complain.latitude]}
                    eventHandlers={{
                      click: (e) => {
                        const element = document.getElementById(complain.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                    }}
                    // @ts-ignore
                    //icon={iconPerson}
                    icon={
                      new Icon({
                        iconUrl:
                          'https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                      })
                    }
                  >
                    <Popup>
                      <div
                        onClick={() => {
                          const element = document.getElementById(complain.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <span className="block text-lg">{complain.title}</span>
                        <span className="block">
                          {complain.descriptionSnippet}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              );
            })}
        </MapContainer>
      </div>
    );
  }
};

const Map: React.FC<MapProps> = ({
  isMapLoaded,
  complains,
  latlng,
  onClick,
}) => {
  const [position, setMarkerPosition] = React.useState<[number, number] | null>(
    null
  );
  // var map = L.map('map', {
  //   center: [51.505, -0.09],
  //   zoom: 13,
  // });
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
      {/* {conditionalMapLoading(isMapLoaded)} */}

      {
        //@ts-ignore
      }

      {renderMap(complains, latlng, onClick)}

      <div
        className="hidden"
        id="myMap"
        style={{
          width: '600px',
          height: '500px',
          border: '2px solid black',
        }}
      ></div>
    </div>
  );
};

const mapStateToProps = (state: StoreStateI, _: any) => {
  return { isMapLoaded: state.mapLoadedForm.isMapLoaded };
};

export default connect(mapStateToProps, {})(Map) as any;
