import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../Components/ShoppingCart";
import { useLocalStorage } from "../Hooks/useLocalStorage";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContextt = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextt);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  const cartQuantity = cartItems?.reduce(
    (quantity, item) => item?.quantity + quantity,
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  const getItemQuantity = (id: number) => {
    return cartItems?.find((item) => item?.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item?.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems?.map((item) => {
          if (item?.id === id) {
            return { ...item, quantity: item?.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item?.id === id)?.quantity === 1) {
        return currItems?.filter((item) => item?.id !== id);
      } else {
        return currItems?.map((item) => {
          if (item?.id === id) {
            return { ...item, quantity: item?.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems?.filter((item) => item?.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        cartQuantity,
        getItemQuantity,
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        isOpen,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
