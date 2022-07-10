import { setMapLoadedForm } from '../store/actions';
import { store } from '../store/store';
import AtlasMap from 'azure-maps-control';

interface AtlasWindow extends Window {
  atlas: any;
}

declare let window: AtlasWindow;

export function GetMap(
  latitude: number,
  longitude: number,
  createComplain: boolean = false
) {
  //Initialize a map instance.
  let map: any;
  //@ts-ignore
  const atlas = window.atlas;
  map = new atlas.Map('myMap', {
    center: [latitude, longitude],
    zoom: 11,
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
  //@ts-ignore
  window.map = map;
  if (document.querySelector('.azure-map-copyright')) {
    //@ts-ignore
    document.querySelector('.azure-map-copyright').style.display = 'none';
  }

  //Wait until the map resources are ready.
  store.dispatch(setMapLoadedForm({ isMapLoaded: true }));
  map.events.add('ready', function () {
    //Create a marker and add it to the map.
    if (document.querySelector('.azure-map-copyright')) {
      //@ts-ignore
      document.querySelector('.azure-map-copyright').style.display = 'none';
    }
  });
}

export function resetMap() {
  //@ts-ignore
  window.map.markers.clear();
}

export function setPointerMarker(latitude: number, longitude: number) {
  // console.log('ran', latitude, longitude);
  // console.log(store.getState().mapLoadedForm.isMapLoaded);

  if (store.getState().mapLoadedForm.isMapLoaded) {
    //@ts-ignore
    let marker = new atlas.HtmlMarker({
      position: [latitude, longitude],
    });

    //@ts-ignore
    window.map.markers.add(marker);
  }
}

// htmlContent: '<div class="pulseIcon"></div>',

export function setYellowDotMarker(latitude: number, longitude: number) {
  if (store.getState().mapLoadedForm.isMapLoaded) {
    //@ts-ignore
    let marker = new window.atlas.HtmlMarker({
      position: [latitude, longitude],
      htmlContent: '<div class="yellowMarker"></div>',
    });
    //@ts-ignore
    window.map.markers.add(marker);
  }
}

export function setPulsatingMarker(latitude: number, longitude: number) {
  if (store.getState().mapLoadedForm.isMapLoaded) {
    //@ts-ignore
    let marker = new window.atlas.HtmlMarker({
      position: [latitude, longitude],
      htmlContent: '<div class="pulseIcon"></div>',
    });
    //@ts-ignore
    window.map.markers.add(marker);
  }
}

export function setMapOnClickEventHandler() {
  if (store.getState().mapLoadedForm.isMapLoaded) {
    //@ts-ignore

    window.map.events.add('click', function (e: any) {
      resetMap();
      let marker = new window.atlas.HtmlMarker({
        position: e.position,
      });

      //@ts-ignore
      (window.latitude = e.position[0]),
        //@ts-ignore
        (window.longitude = e.position[1]),
        //@ts-ignore
        window.map.markers.add(marker);
    });
  }
}
