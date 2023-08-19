export const validateStartDate = (startDate: string) => {
  const day = new Date().getDate()
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  const currentDate = new Date(year, month, day)
  return new Date(startDate) >= currentDate
}

export const validateEndDate = (endDate: string, startDate: string) => {
  return new Date(endDate).getTime() > new Date(startDate).getTime()
}
