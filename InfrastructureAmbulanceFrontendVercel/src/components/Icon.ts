import L from 'leaflet';

const iconPerson = L.Icon.extend({
  options: {
    iconUrl: require('../../public/Images/img_164074.svg'),
    iconRetinaUrl: require('../../public/Images/img_164074.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon',
  },
});

export { iconPerson };
