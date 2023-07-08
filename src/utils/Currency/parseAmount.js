import { formatCryptoNum } from '../Number/formatNumber'

export const getVolumeInUsd = (price, volume) => {
    try {
        return formatCryptoNum(price * volume, true, 3)
    } catch (error) {
        return 0
    }
}
