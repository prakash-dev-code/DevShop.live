'use client';
import { initializeCartFromUserData } from '@/redux/features/cart-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCartFromUserData());
  }, [dispatch]);

  return null;
}
