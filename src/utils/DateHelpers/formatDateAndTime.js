export const formatDateAndTime = (dd) => {
    const dt = new Date(dd)
    const dtSplit = dt.toISOString().split('T')
    const date = dtSplit[0]
    const time = dtSplit[1].split('.')[0]
    return `${date} ${time}`
}
