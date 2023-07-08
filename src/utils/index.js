import { getCurrencyFromSymbol } from './Currency/getCurrencyFromSymbol'
import { formatLargeNum } from './Number/formatLargeNumber'
import { formatCryptoNum } from './Number/formatNumber'
import { format } from './Number/formatNumber'

const Currency = {
  getCurrencyFromSymbol
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
