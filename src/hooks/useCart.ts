import React, { useContext } from 'react';
import { Product } from '@/utils/types';
import { CreateCartContext } from '@/utils/cartContext';

export const contextObject = CreateCartContext<Product>();

function useCart() {
  const context = useContext(contextObject)

  return context;
}

export default useCart;