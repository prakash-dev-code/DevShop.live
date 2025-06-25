'use client';
import Link from 'next/link';
import React from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
// import DefaultImage from '@/../public/images/products/Product-default.png';
// import { useDeleteProduct } from "@/lib/hooks";
import Image from 'next/image';
// import { IImage, Product } from "@/types/product";
// import { useQuery } from "react-query";
import toast from 'react-hot-toast';
import { useApi } from '@/services/apiServices';

const ProductListPage = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<any>({ data: { doc: [] } });
  // const { data: products = [], isLoading } = useProducts();
  // const { getProducts } = useApi();
  // const {
  //   data: products = [],
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery<any>('products', getProducts, {
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,

  //   onError: (err: any) => {
  //     console.error('Fetch products error:', err.message);
  //     toast.error(err.response?.data?.message || err.message || 'Failed to fetch products');
  //   },
  // });
  // const deleteProduct = useDeleteProduct();

  // const handleDelete = async (id: string) => {
  //   if (confirm('Are you sure to delete this product?')) {
  //     await deleteProduct.mutateAsync(id);
  //   }
  // };

  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        {/* <Link
          href="/dashboard/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <FiPlus size={16} />
          Add Product
        </Link> */}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        {isLoading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  {/* <th className="pb-3">Product ID</th> */}
                  <th className="pb-3">NAME</th>
                  <th className="pb-3">Image</th>
                  <th className="pb-3">CATEGORY</th>
                  {/* <th className="pb-3">PRICE</th> */}
                  <th className="pb-3">PRICE</th>
                  <th className="pb-3">STOCK</th>
                  {/* <th className="pb-3">ratings</th> */}
                  <th className="pb-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.data.doc.map((product: any) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    {/* <td className="py-4 text-gray-300">{product.id}</td> */}
                    <td className="py-4 text-gray-300">{product.name}</td>
                    <td className="py-4 text-gray-300 flex gap-2">
                      {/* <Image
                        src={product?.images[0]?.url ? product?.images[0]?.url : DefaultImage}
                        alt="Product Image"
                        height={200}
                        width={200}
                        className="w-10 h-auto object-contain"
                      /> */}
                    </td>
                    <td className="py-4 text-gray-300">{product.category}</td>
                    {/* <td className="py-4 text-gray-300">${product.price}</td> */}
                    <td className="py-4 text-gray-300">${product.discountedPrice}</td>
                    <td className="py-4 text-gray-300">{product.stock}</td>
                    {/* <td className="py-4 text-gray-300 flex justify-start flex-col">
                      <p>Average: {product.ratings.average}</p>
                      <p>Count: {product.ratings.average}</p>
                    </td> */}
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button
                          // onClick={() => handleDelete(product.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
