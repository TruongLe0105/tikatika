import moment from "moment";
import { Platform } from "react-native";
import "moment/locale/vi";
moment.locale("vi");
import * as ImageManipulator from "expo-image-manipulator";
import VnpayMerchant from "react-native-vnpay-merchant";


export const getFilenameFromPath = (
  filePath: string
): { filename: string; ext: string } => {
  const split = filePath.split("/");
  if (split.length) {
    let filename = split[split.length - 1];
    const splitName = filename.split(".");
    return {
      ext: splitName[splitName.length - 1],
      filename,
    };
  }
  return {
    ext: "",
    filename: "",
  };
};

export const fromNow = (unixTime) => {
  return moment.unix(unixTime).fromNow()
}

/**
 * ==============================================================================
 * ====================================STRING====================================
 * ==============================================================================
 */

/**
 * random string.
 * Example: randomString(5);       // '12h3g'
 *          randomString(10);    // '3HJ12i3hja'
 */
export function randomString(length: number): string {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * format so dien thoai.
 * Example: formatToPhone('0972485601');       // '0972 485 601'
 */
export function formatToPhone(text: string): string {
  const input = text.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const zip = input.substring(0, 4);
  const middle = input.substring(4, 7);
  const last = input.substring(7, 10);

  if (input.length > 7) {
    return `${zip} ${middle} ${last}`;
  } else if (input.length > 4) {
    return `${zip} ${middle}`;
  } else if (input.length > 0) {
    return `${zip}`;
  }

  return "";
}

export function maskPhoneNumber(text: string): string {
  return text.replace(text.substring(0, 6), '*** *** ');
}

export const isNumberPhoneVN = (phone: string) => {
  const regex = /((03|04|05|07|08|09)+([0-9]{8})\b)/g
  return regex.test(phone)
}

export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export function validateEmail(mail) {
  if (emailPattern.test(mail)) {
    return (true)
  }
  return (false)
}

export const insertAt = (str: string | any[], sub: any, pos: any) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

/**
 * ==============================================================================
 * ====================================NUMBER====================================
 * ==============================================================================
 */

/**
 * rút gọn số.
 * Example: convertShortNumber(1000);       // '1K'
 *          convertShortNumber(1230, 1);    // '1.2K'
 *          convertShortNumber(1230, 2);    // '1.23K'
 */
export function convertShortNumber(num: number, digits = 1): string {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const dateTimeToUnix = (dateTime: string) => {
  return moment(dateTime, 'YYYY-MM-DD HH:mm:ss').toDate()
}

/**
 * Format number.
 * Example: formatNumber(1000);       // '1.000'
 *          convertShortNumber(1230.344, 1);    // '1.230,3'
 *          convertShortNumber(1230.344, 1, '.', ',');    // '1,230.3'
 */
export function formatNumber(
  num: any,
  digit: number = 0,
  separatorToken = '.'
): string {
  try {
    return (+num || 0).toFixed(digit)
      .toString()
      .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, separatorToken));
  } catch (e) {
    return "";
  }
}

/**
 * ==============================================================================
 * ====================================FORMAT====================================
 * ==============================================================================
 */

// Code here

/**
 * ==============================================================================
 * ====================================OBJECT====================================
 * ==============================================================================
 */

// Code here

/**
 * ==============================================================================
 * ====================================ARRAY====================================
 * ==============================================================================
 */

export function formatRow<S extends { key?: string, empty?: boolean }>(data: S[], numColumns: number) {
  const arr = [...data];
  const numberOfFullRows = Math.floor(arr.length / numColumns);
  let numberOfElementsLastRow = arr.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    let obj: any = { key: `blank-${numberOfElementsLastRow}`, empty: true }
    arr.push(obj);
    numberOfElementsLastRow++;
  }
  return arr;
};

/**
 * ==============================================================================
 * ====================================TIME====================================
 * ==============================================================================
 */

export function formatDate(timestamp: number): string {
  return moment.unix(timestamp).format("DD/MM/YYYY");
}

export function formatDateTime(timestamp: number): string {
  return moment.unix(timestamp).format("HH:mm, DD/MM/YYYY");
}

export function formatDateDay(timestamp: number): string {
  return moment.unix(timestamp).format("dddd, MM/DD/YYYY");
}

export function getCurrentTimeInt(): number {
  return +(moment().valueOf() / 1000).toFixed();
}

export function getTimeFromNow(date: number): string {
  return moment.unix(date).fromNow()
}

export function getGreetingTime(): string {
  const currentHour = moment().hour();

  let greetingMessage = 'Chào bạn'
  if (currentHour >= 4 && currentHour < 12) {
    greetingMessage = 'Chào buổi sáng'
  }
  if (currentHour >= 12 && currentHour <= 17) {
    greetingMessage = 'Chào buổi chiều'
  }
  if (currentHour > 17 || currentHour < 4) {
    greetingMessage = 'Chào buổi tối'
  }

  return greetingMessage
}

export function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + " : ";
  }

  ret += (mins < 10 ? "0" : "")
  ret += mins + " : " + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

/**
 * 
 * @param {number} d //seconds
 * @returns string 
 */
export function secondsToHms(d) {
  d = +d;
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + " giờ" : "";
  var mDisplay = m > 0 ? m + " phút" : "";

  return hDisplay + " " + mDisplay;
}

/**
 * ==============================================================================
 * ====================================UTILITY====================================
 * ==============================================================================
 */

/**
 * Convert string to array LatLong. Use for google map api.
 * Example: decodeDirection('asojdhljqh35u9raydjasd');       // [{latitude: 31424, long: 234234}]
 */
export function decodeDirection(t: string, e?: any) {
  for (
    var n,
    o,
    u = 0,
    l = 0,
    r = 0,
    d = [],
    h = 0,
    i = 0,
    a = null,
    c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }

  return (d = d.map(function (t) {
    return {
      latitude: t[0],
      longitude: t[1]
    };
  }));
}

/**
 * Convert array LatLong to url string. Use for google map api.
 * Example: convertLatLongToUrl([{lat: 31424, long: 234234}]);       // '31424,234234'
 */
export function convertLatLongToUrl(arr: any[]): string {
  let str = "";
  arr.map(item => {
    str += `${item.lat},${item.long}|`;
  });
  str = str.slice(0, -1);

  return str;
}

/**
 * Convert m to km.
 * Example: metterToKm(1000);       // 1
 */
export function metterToKm(n: number) {
  if (isNaN(n)) return 0;
  return Number(Number.parseFloat((n / 1000).toString()).toPrecision(2));
}

type fontFormats = "ttf" | "otf";

/**
 * example of usage:

  const originalHtml = "<div/>"
  const css = generateAssetsFontCss("Roboto-Dark", "ttf")

  const html = addCssToHtml(originalHtml, css)
 *
 * @param fontFileName - font name in resources
 * @param fileFormat - ttf or otf
 * @returns {string} - css for webview
 */
export const generateAssetsFontCss = (
  fontFileName: string,
  fileFormat: fontFormats = "ttf"
) => {
  const fileUri = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`
  });

  return `
	@font-face {
        	font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') format('${fileFormat === "ttf" ? "truetype" : "opentype"
    }');
	}
	`;
};

/**
 * Compress image
 */
export async function compressImage(image: string, actions?: ImageManipulator.Action[], compress = 0.7) {
  const manipResult = await ImageManipulator.manipulateAsync(image, actions, {
    compress,
    format: ImageManipulator.SaveFormat.PNG,
  });
  return manipResult;
};

export function transformCity(text: string) {
  if (!text) {
    return "";
  }
  const city = text.replace(/(TP )|(Thành phố )/, "");
  return city.replace(" - ", "-");
}

export function transformDistrict(text: string) {
  if (!text) {
    return "";
  }
  return text.replace(/(Quận )|(Thành phố )|(TP )|(Huyện )|(Thị trấn )/, "");
}

export function transformWard(text: string) {
  if (!text) {
    return "";
  }
  return text.replace(/(Phường )|(Xã )/, "");
}

export function removeAccents(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

/**
 * example of usage:
 *
 * @param distance - quang duong (km)
 * @param speed - vận tốc (km/h)
 * @returns {number} - time by minute
 */
export function convertDistanceToTime(distance: number, speed: number = 40) {
  const rate = distance / speed // Time là h
  return formatNumber(rate * 60, 1)
}

export const openVnPay = (paymentUrl: string) => {
  VnpayMerchant.show({
    scheme: "tikaetuser",
    isSandbox: false,
    paymentUrl,
    tmn_code: "TIKA0003",
    backAlert: "Bạn có chắc chắn trở lại ko?",
    title: "Thanh toán",
    iconBackName: "ion_back",
    beginColor: '#E85A91',
    endColor: '#E85A91',
    titleColor: '#FFFFFF',
  });
};