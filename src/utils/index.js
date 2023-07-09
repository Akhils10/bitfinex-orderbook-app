import { getCurrencyFromSymbol } from './Currency/getCurrencyFromSymbol'
import { formatLargeNum } from './Number/formatLargeNumber'
import { formatCryptoNum } from './Number/formatNumber'
import { format } from './Number/formatNumber'
import { getVolumeInUsd } from './Currency/parseAmount'
import { getTimeFromDate } from './DateHelpers/getTimeFromeDate'
import { formatDateAndTime } from './DateHelpers/formatDateAndTime'

const Currency = {
  getCurrencyFromSymbol,
  getVolumeInUsd
}

const DateHelpers = {
  getTimeFromDate,
  formatDateAndTime
}

const NumberHelpers = {
  format,
  formatCryptoNum,
  formatLargeNum
}

export {
  Currency,
  DateHelpers,
  NumberHelpers
}
