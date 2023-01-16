import Head from 'next/head'
import Layout from '@/components/Layout'
import ProductList from '@/components/ProductList'
import {
  useQuery,
} from '@tanstack/react-query'
import api from '@/utils/api'
import { Product } from '@/utils/types'

export default function Home() {
  const { data } = useQuery<Product[], Error>({
    queryKey: ['products'], queryFn: async () => {
      const res = await api.get('products');
      return res.data;
    }
  })

  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ProductList items={data} />
      </Layout>
    </>
  )
}