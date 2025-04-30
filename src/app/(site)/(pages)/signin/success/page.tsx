'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/redux/features/auth-slice';
import { useApi } from '@/services/apiServices';
import toast from 'react-hot-toast';
import { User } from '@/types/common';
import PreLoader from '@/components/Common/PreLoader';

const SuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { getLoggedUser } = useApi();
  const [loading, setLoading] = useState(true); // <-- loader state

  useEffect(() => {
    const fetchUserData = async () => {
      const token = searchParams.get('token');

      dispatch(setLogin({ token, user: null })); // set token

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getLoggedUser();
        const { data } = res as { data: { user: User } };

        if (data && data.user) {
          dispatch(setLogin({ token, user: data.user }));
          toast.success('Logged in successfully!');
        } else {
          throw new Error('User data not found');
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        dispatch(setLogin({ token, user: null }));
      } finally {
        setLoading(false);
        router.push('/');
      }
    };

    fetchUserData();
  }, [dispatch, router, searchParams, getLoggedUser]);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <h2 className="text-3xl font-medium text-blue">Redirecting...</h2>
        </div>
      )}
    </>
  );
};

export default SuccessPage;
