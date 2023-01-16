import Layout from '@/components/Layout';
import useCart from '@/hooks/useCart';
import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import {
  useMutation
} from '@tanstack/react-query'
import { useRouter } from 'next/router';
import axios from 'axios';

function Cart() {
  const router = useRouter();
  const cart = useCart();
  const [values, setValues] = useState({ name: '', deliveryAddress: '' });
  const mutation = useMutation({
    mutationFn: (body: any) => {
      console.log(body);
      return axios.post('/api/orders', body);
    },
    onError: (err) => {
      console.log(err);
      alert('Failed');
    },
    onSuccess: () => {
      alert('Success');
      cart.removeAll();
      router.push('/');
    }
  });

  let total = 0;

  cart.cart.forEach(data => {
    total += data.item.price * data.quantity;
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      name: values.name,
      deliveryAddress: values.deliveryAddress,
      items: cart.cart.map((data) => ({ quantity: data.quantity, productId: data.item.id }))
    })
  }
  return (
    <Layout>
      <div className='mt-4'>
        <h1 className='text-3xl font-medium mb-4'>Cart</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div>
            {
              cart.cart?.map(data => (
                <div key={data.item.id} className='mb-4 flex justify-between'>
                  <div className='flex'>
                    <img src={data.item.image} width={100} className='rounded' />
                    <div className='ml-4'>
                      <h3 className='text-lg font-medium'>{data.item.name}</h3>
                      <p className='text-sm'>$ {data.item.price}</p>
                      <p className='text-base'>Qty: {data.quantity}</p>
                      <p className='text-base mt-2 font-medium'>Total: ${data.quantity * data.item.price}</p>
                    </div>
                  </div>
                  <button onClick={() => cart.removeProductFromCart(data.item)}>
                    <TrashIcon className="h-[29px] w-[29px]  text-red-600" />
                  </button>
                </div>
              ))
            }
          </div>
          <div>
            <div className='bg-slate-100 p-4 rounded'>
              <form onSubmit={handleSubmit}>
                <h3 className='text-xl font-semibold'>Order summary</h3>
                <div className='mt-4'>
                  <input onChange={(e) => setValues({ ...values, name: e.target.value })} value={values.name} placeholder='Name' className='w-full p-2' required />
                  <textarea onChange={(e) => setValues({ ...values, deliveryAddress: e.target.value })} value={values.deliveryAddress} placeholder='Address' className='w-full p-2 mt-2'></textarea>
                </div>
                <div className='mb-4 mt-2 flex justify-between font-medium'>
                  <p>Total</p>
                  <p>${total}</p>
                </div>
                <Button type='submit' disabled={total === 0 || mutation.isLoading} fullWidth>
                  Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;