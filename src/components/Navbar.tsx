import useCart from '@/hooks/useCart'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
  const cart = useCart();
  return (
    <div className='bg-gray-800'>
      <div className="mx-auto container ">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <h3 className="text-xl text-white">🍎 Sweet Apple Acres</h3>
              </Link>
            </div>

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href='/cart'>
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center"
              >
                <span className="sr-only">View Cart</span>
                <ShoppingCartIcon className="h-6 w-6 mr-1" aria-hidden="true" />
                <span>{cart.total}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
