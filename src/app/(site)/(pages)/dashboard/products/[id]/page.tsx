'use client';
import ProductForm from '@/components/product/ProductForm';
import { useApi } from '@/services/apiServices';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditProductPage = () => {
  const { id } = useParams() as { id: string };
  const { getProductById } = useApi();
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async (id: string) => {
    try {
      const res = (await getProductById(id)) as {
        data?: {
          doc?: any[];
        };
      };

      if (res?.data?.doc) {
        setProduct(res.data.doc);
      }
    } catch (error: any) {
      console.error('fetch product error:', error.message);
      toast.error(error.message || 'Failed to fetch product');
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Product</h1>
      <ProductForm initialData={product} mode="edit" />
    </div>
  );
};

export default EditProductPage;
