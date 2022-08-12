import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';


export function calcDistance(latLng1: LatLng, latLng2: LatLng): number {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (latLng2.latitude - latLng1.latitude) * Math.PI / 180;
  var dLon = (latLng2.longitude - latLng1.longitude) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latLng1.latitude * Math.PI / 180) * Math.cos(latLng2.latitude * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.round(d);
}


export interface deltaCoords {
  latitudeDelta: number,
  longitudeDelta: number
}

export function getRegionForCoordinates(points: Array<LatLng>): deltaCoords {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);
  const res: deltaCoords = {
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
  return res
}