export const getTimeFromDate = (date) => {
    const dt = new Date(date)
    return dt.toISOString().split('T')[1].split('.')[0]
}
