export const maskOnlyNumber = (value: string): string => {
  return value.replace(/(\D)/g, '')
}

export const maskNumber = (value: string): number => {
  if (!value) return 0
  return Number(maskOnlyNumber(value))
}

export const normalizeString = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const maskToParamsURL = (str: string) =>
  normalizeString(str).toLocaleLowerCase().replace(/ /g, '-')

export const maskSigla = (value: string) => {
  return normalizeString(value).replace(/\s/g, '').toUpperCase()
}

export const capitalizeString = (str: string) => {
  return str.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}
