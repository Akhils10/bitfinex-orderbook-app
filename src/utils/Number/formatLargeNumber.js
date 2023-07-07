const decimalCount = num => {
	// Convert to String

	const numStr = String(num)
	// String Contains Decimal
	if (numStr.includes('.')) {
		return -Math.floor(Math.log10(num) + 1)
		// return (numStr.match(/^0+/) || [""])[0].length;
	}

	// String Does Not Contain Decimal
	return 0
}

export const formatLargeNum = (num) => {
	if (num === 0) {
		return num
	}
	if (num > 0 && num < 1) {
		const count = decimalCount(num)
		return (num / 1).toFixed(count + 3)
	} else if (num > 1 && num < 999) {
		return `${(num / 1).toFixed(3)}`
	} else if (num > 999 && num < 100000) {
		return `${new Intl.NumberFormat().format(num)}`
	} else if (num > 100000 && num < 1000000) {
		return `${(num / 1000).toFixed(3)}K`
	} else if (num >= 1000000 && num < 1000000000) {
		return `${(num / 1000000).toFixed(3)}M`
	} else if (num >= 1000000000 && num < 1000000000000) {
		return `${(num / 1000000000).toFixed(3)}B`
	} else if (num > 1000000000000) {
		return `${(num / 1000000000000).toFixed(3)}T`
	} else if (num < 900) {
		return num
	}
	return num
}
