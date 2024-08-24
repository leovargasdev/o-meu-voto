/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormEvent, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import cities from 'data/mock-cities.json'

import styles from './styles.module.scss'
import api from 'lib/api'
import type { CandidateSimple } from 'types/candidate'

const SearchPage = () => {
  const [candidates, setCadandidates] = useState<CandidateSimple[]>([])

  const handleSearchCandidates = async (event: FormEvent) => {
    event.preventDefault()

    // @ts-ignore
    const role = event.target.role.value
    // @ts-ignore
    const city = event.target.city.value

    const response = await api.get<{ candidatos: CandidateSimple[] }>(
      `listar/2024/${city}/2045202024/${role}/candidatos`
    )

    setCadandidates(response.data.candidatos)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSearchCandidates}>
        <fieldset>
          <label htmlFor="">Estado</label>
          <select name="state" id="state">
            <option value="sc">Santa Catarina</option>
            <option value="pr">Paraná</option>
            <option value="rs">Rio Grande do Sul</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="">Cidade</label>
          <select name="city" id="city">
            {cities.map(city => (
              <option value={city.codigo} key={city.codigo}>
                {city.nome}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="">Cargo</label>
          <select name="role" id="role">
            <option value="11">Prefeito</option>
            <option value="12">Vice-prefeito</option>
            <option value="13">Vereador</option>
          </select>
        </fieldset>

        <button type="submit">Buscar</button>
      </form>

      <h1>Lista dos candidatos</h1>

      <div className={styles.candidates}>
        {candidates
          .filter(c => c.descricaoSituacao !== 'Indeferido')
          .map(candidate => {
            const code = candidate.numero.toString().split('')

            return (
              <Link
                target="_blank"
                href={`/cidade-v2/${candidate.ufCandidatura}/candidato/${candidate.id}`}
                className={classNames('card', styles.candidate)}
                key={candidate.id}
              >
                <img src="/icons/MDB.png" width="auto" height={48} />

                <div className={styles.info}>
                  <strong>{candidate.nomeUrna}</strong>
                  <p>{candidate.nomeCompleto}</p>
                </div>

                <div className={styles.code}>
                  {code.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default SearchPage
