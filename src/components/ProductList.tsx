import { Product } from '@/utils/types';
import Link from 'next/link';
import React from 'react';
import { Rating } from 'react-simple-star-rating'

interface ProductList {
  items?: Product[]
}

export default function ProductList({ items }: ProductList) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items?.map((product) => (
            <div key={product.id}>
              <Link className="group" href={'/product/' + product.id}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <div className='flex justify-between'>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                  <div className='flex'>
                    <div className='mt-1 mr-1'>{product.rating}</div>
                    <Rating size={20} iconsCount={1} readonly initialValue={1} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
