import { useEffect, useState } from 'react';
import axios from 'axios';
import initialState from '../initialState';

const API = process.env.API;

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category ? `${API}/category/${category}` : API
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error.status, error.message);
      }
    };
    getProducts();
  }, [category]);

  const addToCart = (payload) => {
    if (state.cart.products.includes(payload)) return { ...state };
    setState({
      ...state,
      cart: {
        products: [...state.cart.products, payload],
        total: state.cart.total + payload.price,
      },
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: {
        products: state.cart.products.filter((item) => item.id !== payload.id),
        total: state.cart.total - payload.price,
      },
    });
  };

  const clearCart = () => {
    setState({
      ...state,
      cart: {
        products: [],
        total: 0,
      },
    });
  };

  const addBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };

  const changeCategory = (payload) => {
    setCategory(payload);
  };

  const addToFavorites = (payload) => {
    if (state.favorites.includes(payload)) return { ...state };
    setState({
      ...state,
      favorites: [
        ...state.favorites.filter((item) => item.id !== payload.id),
        payload,
      ],
    });
  };

  const removeFromFavorites = (payload) => {
    setState({
      ...state,
      favorites: state.favorites.filter((item) => item.id !== payload.id),
    });
  };

  return {
    state,
    products,
    loading,
    error,
    addBuyer,
    addToCart,
    removeFromCart,
    changeCategory,
    category,
    addToFavorites,
    removeFromFavorites,
    clearCart,
  };
};

export default useInitialState;
