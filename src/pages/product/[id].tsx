import Layout from '@/components/Layout';
import api from '@/utils/api';
import { NextContex, Product } from '@/utils/types';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image'
import Button from '@/components/Button';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { Rating } from 'react-simple-star-rating'
import useCart from '@/hooks/useCart';

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Layout>
        <div className='mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='relative w-full'>
              <img src={product.image} alt={product.name} className='w-full rounded-xl' />
            </div>
            <div>
              <h1 className='text-3xl font-semibold'>{product.name}</h1>
              <h3 className='text-2xl mt-1'>${product.price}</h3>
              <div className='flex mt-2'>
                <div className='mt-1 mr-1'>{product.rating}</div> <Rating allowFraction readonly initialValue={product.rating} size={20} />
              </div>
              <h5 className='text-xl font-medium mt-2'>Description</h5>
              <p>{product.description}</p>
              <div className='mt-4'>
                <div className='mb-3 flex items-center'>
                  <button disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} className='border'>
                    <MinusIcon className="h-[32px] w-[32px]" />
                  </button>
                  <input onChange={(e) => setQuantity(Number(e.target.value))} value={quantity} className='py-1 text-center w-[80px] border-t border-b ' type="number" />
                  <button onClick={() => setQuantity(quantity + 1)} className='border'>
                    <PlusIcon className="h-[32px] w-[32px]" />
                  </button>
                </div>
                <Button onClick={() => cart.addProductToCart({ item: product, quantity })}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await api.get('products');

  const paths = res.data.map((c: Product) => {
    return { params: { id: c.id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: NextContex) {

  const res = await api.get(`products/${context.params.id}`);

  return {
    props: { product: res.data },
  }
}


export default Product;