import { getCurrencyFromSymbol } from './Currency/getCurrencyFromSymbol'
import { formatLargeNum } from './Number/formatLargeNumber'
import { formatCryptoNum } from './Number/formatNumber'
import { format } from './Number/formatNumber'
import { getVolumeInUsd } from './Currency/parseAmount'

const Currency = {
  getCurrencyFromSymbol,
  getVolumeInUsd
}

const NumberHelpers = {
  format,
  formatCryptoNum,
  formatLargeNum
}

export {
  Currency,
  NumberHelpers
}
