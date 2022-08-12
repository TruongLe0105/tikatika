
import { getEnvironment } from "./enviroment"
import appJSON from '../app.json'

const { baseUrl: BASE_URL } = getEnvironment()

export { BASE_URL }
export const fbAppId = '317704142998424'
export const VersionApp = appJSON.expo.version
export const Version = '1.0.0'