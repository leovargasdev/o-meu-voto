export * from './candidate'
export * from './city'

export interface Option {
  value: string
  label: string
}

export type TypeLink =
  | 'default'
  | 'youtube'
  | 'x'
  | 'facebook'
  | 'instagram'
  | 'threads'
  | 'telegram'
  | 'linkedin'
  | 'tiktok'

export interface SocialLink {
  type: TypeLink
  url: string
}
