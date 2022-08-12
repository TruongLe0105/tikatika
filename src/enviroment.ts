import { EnvironmentType } from '@/types/screen';
import * as Updates from 'expo-updates';

const bmdDomain = 'https://173et.bmdapp.store:4173'
const tikatikaDomain = 'https://admindelivery.tikatika.net:8080'
const shareBmdDomain = 'https://caidat-et.bmdapp.store'

export function getEnvironment() {
  if (Updates.releaseChannel.startsWith('production')) {
    // matches prod-v1, prod-v2, prod-v3
    return { envName: EnvironmentType.Production, baseUrl: tikatikaDomain, shareUrl: shareBmdDomain, googleSheetId: 'ddd' }; // prod env settings
  } else if (Updates.releaseChannel.startsWith('staging')) {
    // matches staging-v1, staging-v2
    return { envName: EnvironmentType.Staging, baseUrl: bmdDomain, shareUrl: shareBmdDomain, googleSheetId: 'fff' }; // stage env settings
  } else {
    // assume any other release channel is development
    return {
      envName: EnvironmentType.Development,
      // baseUrl: bmdDomain,
      baseUrl: tikatikaDomain,
      shareUrl: shareBmdDomain,
      googleSheetId: ''
    }; // dev env settings
  }
}

