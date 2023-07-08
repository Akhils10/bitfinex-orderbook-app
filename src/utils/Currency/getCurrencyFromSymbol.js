const currencyList = ['USD', 'USDT', 'UST']

/**
 *
 * @param {string} symbol
 * @returns
 */
export const getCurrencyFromSymbol = (symbol) => {
    try {
        const regex = new RegExp(`(${currencyList.join('|')})$`)
        const hasCurrency = currencyList.some(currency => symbol.includes(currency))
        if (hasCurrency && symbol.includes(':')) {
            const _temp = symbol.split(':')[1]
            let _curr = ''
            _curr = _temp.match(regex)
            if (_curr) return _curr[0]
            return _temp
        } else if (hasCurrency) return symbol.match(regex)[0]
        return (symbol.length === 7) ? symbol.slice(4, 7) : symbol
    } catch (error) {
        return ''
    }
}
