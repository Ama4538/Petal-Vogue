import { useContext } from 'react';
import { AppContext } from './AppProvider';

export function useAllProducts() {
    const { allProducts, setAllProducts } = useContext(AppContext);
    return { allProducts, setAllProducts };
}

export function useCartInventory() {
    const { cartInventory, setCartInventory } = useContext(AppContext);
    let cartAmount = 0;
    for (let i = 0; i < cartInventory.length; i++) {
        cartAmount += cartInventory[i].quantity;
    }
    return { cartInventory, setCartInventory, cartAmount };
}

export function useSearched() {
    const { searched, setSearched } = useContext(AppContext);
    return { searched, setSearched };
}
