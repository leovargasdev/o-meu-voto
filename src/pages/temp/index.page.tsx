import Head from 'next/head'
import { Layout } from 'components'

import { serviceGetCandidates } from 'services'

const EmptyPage = () => {
  const request = async () => {
    const response = await serviceGetCandidates('61034')
    console.log(response)
  }

  return (
    <Layout>
      <button onClick={request}>aa</button>
    </Layout>
  )
}

export default EmptyPage
