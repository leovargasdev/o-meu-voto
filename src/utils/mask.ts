export const maskOnlyNumber = (value: string): string => {
  return value.replace(/(\D)/g, '')
}

export const maskNumber = (value: string): number => {
  if (!value) return 0
  return Number(maskOnlyNumber(value))
}

export const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/\s/g, '')
    .replace(/[\u0300-\u036f]/g, '')
}

export const maskToParamsURL = (str: string) =>
  normalizeString(str).toLocaleLowerCase().replace(/ /g, '-')
