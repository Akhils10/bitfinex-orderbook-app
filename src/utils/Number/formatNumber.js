
export const format = (num) => new Intl.NumberFormat().format(num)

const checkZeros = (num) => {
    const parts = Array.from(String(num), Number).join('').split('NaN')
    const whole = Number(parts[0])

    const count = 0
    const numbersLeft = null

    return {
      count,
      whole,
      numbersLeft,
    }
  }

  const formatCryptoNum = (
    figure,
    commas = true,
    deci = 8,
    dots = true
  ) => {
    const num = String(figure).replace(/,/g, '')
    const { count, whole, numbersLeft } = checkZeros(num)

    const hasManyZeros = count > 4
    if (hasManyZeros && dots) {
      return `${whole}.0...00${numbersLeft}`
    } else if (hasManyZeros && !dots) {
      return figure
    } else {
      // add decimals to number if it doesn't contain too many zeros
      const number = Number(num).toFixed(deci)

      if (commas) {
        const parts = (+number).toString().split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        return parts.join('.')
      } else {
        return +number
      }
    }
  }

  export { formatCryptoNum }
