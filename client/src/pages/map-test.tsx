import React, { useEffect } from 'react';
//import { AuthenticationType } from 'azure-maps-control';
//import atlasMap from 'azure-maps-control';
import Head from 'next/head';
import Script from 'next/script';

interface AtlasWindow extends Window {
  atlas: any;
}
declare let window: AtlasWindow;
function GetMap() {
  //Initialize a map instance.
  let map: any;
  const atlas = window.atlas;
  map = new atlas.Map('myMap', {
    center: [85.32767705161245, 27.705308474955412],
    zoom: 13,
    view: 'Auto',
    style: 'satellite',
    showLogo: false,
    showFeedbackLink: false,
    //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
    authOptions: {
      authType: 'subscriptionKey',
      subscriptionKey: process.env.NEXT_PUBLIC_AZURE_KEY,
    },
  });

  //Wait until the map resources are ready.
  map.events.add('ready', function () {
    //Create a marker and add it to the map.
    if (document.querySelector('.azure-map-copyright')) {
      //@ts-ignore
      document.querySelector('.azure-map-copyright').style.display = 'none';
    }
    let marker = new atlas.HtmlMarker({
      position: [85.32767705161245, 27.705308474955412],
    });
    map.markers.add(marker);

    //When the map is clicked, animate the marker to the new position.
    map.events.add('click', function (e) {
      map.markers.remove(marker);
      marker = new atlas.HtmlMarker({
        position: e.position,
      });
      map.markers.add(marker);
    });
  });
}
const DefaultMap: React.FC = () => {
  useEffect(() => {
    //GetMap();
  });
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css"
          type="text/css"
        />
      </Head>
      <Script
        onLoad={GetMap}
        type="text/javascript"
        src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"
      ></Script>
      <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div>
    </div>
  );
};

export default DefaultMap;
