// format number input to 100,000,000 format
export const formatQubicAmount = (amount, seperator = ',') => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator).replace('.0','')
}

export const truncateMiddle = (str, charsToRemove) => {
    const length = str.length
    const start = Math.floor((length - charsToRemove) / 2)
    const end = start + charsToRemove

    return str.slice(0, start) + '...' + str.slice(end)
}

export const sumArray = (arr) => arr.reduce((acc, curr) => acc + curr, 0)
