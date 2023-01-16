import { HTMLAttributes, useState, createContext } from "react"

export interface CartItemBase {
  id: string
}

const defaultContext: CartContextType<any> = {
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  total: 0
}

export function CreateCartContext<TItemType extends CartItemBase>() {
  return createContext < CartContextType < TItemType >> (defaultContext)
}


export interface CartListItem<TItemType extends CartItemBase> {
  item: TItemType
  quantity: number
}

export interface CartContextType<TItemType extends CartItemBase> {
  cart: CartListItem<TItemType>[]
  addProductToCart: (item: CartListItem<TItemType>) => void
  removeProductFromCart: (item: TItemType) => void
  removeAll: () => void
  total: number
}

export type CartContextProps<TItemType extends CartItemBase> = {
  context: React.Context<CartContextType<TItemType>>
} & HTMLAttributes<HTMLDivElement>

export function CartContextProvider<TItemType extends CartItemBase>({
  children,
  context
}: CartContextProps<TItemType>) {
  const [products, setProducts] = useState < CartListItem < TItemType > [] > ([])

  const getProductById = (id: string): CartListItem<TItemType> | undefined => {
    return products.find(p => p.item.id === id)
  }

  const addProductToCart = (product: CartListItem<TItemType>): void => {
    {
      const existingProduct = getProductById(product.item.id)
      let newState: CartListItem<TItemType>[] = []
      if (existingProduct) {

        newState = products.map((p) => {
          if (p.item.id === existingProduct.item.id) {
            return {
              item: p.item,
              quantity: p.quantity + product.quantity
            }
          }
          return p
        })
        setProducts(newState)
      } else {
        setProducts([...products, product])
      }
    }
  }
  const removeProductFromCart = (product: TItemType) => {
    const newProducts = products.filter(p => p.item.id !== product.id)

    setProducts(newProducts)
  }

  const removeAll = () => {
    setProducts([]);
  }

  const total = products.reduce(function (accumulator, curValue) {
    return accumulator + curValue.quantity;
  }, 0);
  const contextValue: CartContextType<TItemType> = {
    cart: products,
    addProductToCart,
    removeProductFromCart,
    removeAll,
    total
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}