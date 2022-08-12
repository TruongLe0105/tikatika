import request from "@/utils/request";
import moment from "moment";
import { LatLng } from "react-native-maps";
const GOOGLE_KEY = "AIzaSyBznwOJvaLI0BAAkMG-pVaqLetBLsMEt9c"; // google map api key bmd

const baseURL = "https://maps.googleapis.com/maps";

export function getMap(text) {
  return request({
    baseURL,
    url: `/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&language=vi&fields=formatted_address,name,geometry&key=${GOOGLE_KEY}`,
    method: "get"
  });
}

export function getPlaceByLatLng(latLng: Partial<LatLng>): any {
  let url = `/api/geocode/json?latlng=${latLng.latitude},${latLng.longitude}&key=${GOOGLE_KEY}`

  return request({
    baseURL,
    url,
    method: "get"
  });
}

export function findPlace(text, latLng?: LatLng) {
  let location, radius = 100 * 1000;
  if (latLng) {
    location = `${latLng.latitude},${latLng.longitude}`
  }
  console.log('findPlace', location);

  return request({
    baseURL,
    url: `/api/place/queryautocomplete/json?input=${text}&types=geocode&language=vi&region=VN&key=${GOOGLE_KEY}`,
    method: "get",
    params: {
      location,
      radius
    }
  });
}

export function getDetail(placeId: string) {
  return request({
    baseURL,
    url: `/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry,name,icon,place_id&key=${GOOGLE_KEY}`,
    method: "get"
  });
}
// 10.7729615,106.6238969
export function getDirection(origin: LatLng, destination: LatLng) {
  let url = `/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_KEY}`
  return request({
    baseURL,
    url,
    method: "get",
    params: {
      traffic_model: "optimistic",
      avoid: "highways",
      departure_time: moment().unix(),
    }
  });
}

export function getMatrixDistance(origin, destination) {
  let url = `/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=metric&key=${GOOGLE_KEY}`


  return request({
    baseURL,
    url,
    method: "get"
  });
}
