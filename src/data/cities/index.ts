import ac from './ac.json'
import al from './al.json'
import am from './am.json'
import ap from './ap.json'
import ba from './ba.json'
import ce from './ce.json'
import es from './es.json'
import go from './go.json'
import ma from './ma.json'
import mg from './mg.json'
import ms from './ms.json'
import mt from './mt.json'
import pa from './pa.json'
import pb from './pb.json'
import pe from './pe.json'
import pi from './pi.json'
import pr from './pr.json'
import rj from './rj.json'
import rn from './rn.json'
import ro from './ro.json'
import rr from './rr.json'
import rs from './rs.json'
import sc from './sc.json'
import se from './se.json'
import sp from './sp.json'
import to from './to.json'

import { Option } from 'types'

export const states = [
  { label: 'Acre', value: 'ac' },
  { label: 'Alagoas', value: 'al' },
  { label: 'Amapá', value: 'ap' },
  { label: 'Amazonas', value: 'am' },
  { label: 'Bahia', value: 'ba' },
  { label: 'Ceará', value: 'ce' },
  { label: 'Espírito Santo', value: 'es' },
  { label: 'Goiás', value: 'go' },
  { label: 'Maranhão', value: 'ma' },
  { label: 'Mato Grosso', value: 'mt' },
  { label: 'Mato Grosso do Sul', value: 'ms' },
  { label: 'Minas Gerais', value: 'mg' },
  { label: 'Pará', value: 'pa' },
  { label: 'Paraíba', value: 'pb' },
  { label: 'Paraná', value: 'pr' },
  { label: 'Pernambuco', value: 'pe' },
  { label: 'Piauí', value: 'pi' },
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Rio Grande do Norte', value: 'rn' },
  { label: 'Rio Grande do Sul', value: 'rs' },
  { label: 'Rondônia', value: 'ro' },
  { label: 'Roraima', value: 'rr' },
  { label: 'Santa Catarina', value: 'sc' },
  { label: 'São Paulo', value: 'sp' },
  { label: 'Sergipe', value: 'se' },
  { label: 'Tocantins', value: 'to' }
]

export const citiesByState: Record<string, Option[]> = {
  ac,
  al,
  am,
  ap,
  ba,
  ce,
  es,
  go,
  ma,
  mg,
  ms,
  mt,
  pa,
  pb,
  pe,
  pi,
  pr,
  rj,
  rn,
  ro,
  rr,
  rs,
  sc,
  se,
  sp,
  to
}

export const cities = [
  ...ac,
  ...al,
  ...am,
  ...ap,
  ...ba,
  ...ce,
  ...es,
  ...go,
  ...ma,
  ...mg,
  ...ms,
  ...mt,
  ...pa,
  ...pb,
  ...pe,
  ...pi,
  ...pr,
  ...rj,
  ...rn,
  ...ro,
  ...rr,
  ...rs,
  ...sc,
  ...se,
  ...sp,
  ...to
]
