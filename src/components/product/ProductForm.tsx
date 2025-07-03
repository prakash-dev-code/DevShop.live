'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useApi } from '@/services/apiServices';
import ButtonLoader from '../Common/buttonLoader';

type ProductFormProps = {
  initialData?: Product;
  mode: 'add' | 'edit';
};

type ImageType = {
  url: string;
  altText: string;
  file: File;
};

const CATEGORY_OPTIONS = [
  'electronics',
  'clothing',
  'books',
  'computer',
  'games_and_videos',
  'mobile_and_tablet',
  'home',
  'watches',
  'other',
];

const defaultValues = {
  name: '',
  description: '',
  price: '',
  discountedPrice: '',
  category: '',
  stock: '',
  images: [] as ImageType[],
};

const ProductForm: React.FC<ProductFormProps> = ({ initialData, mode }) => {
  const [formData, setFormData] = useState({ ...defaultValues });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { createProduct, updateProduct } = useApi();

  useEffect(() => {
    if (initialData) {
      const cleanData = {
        ...initialData,
        price: initialData.price,
        discountedPrice: initialData.discountedPrice,
        stock: initialData.stock,
        images: initialData.images || [],
      };
      //@ts-ignore
      setFormData({ ...defaultValues, ...cleanData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      const newImage: ImageType = {
        url: imageUrl,
        altText: file.name,
        file: file, // store actual File
      };

      setFormData(prev => ({
        ...prev,
        images: [newImage, ...prev.images],
      }));
    }
  };
  const removeImageField = (index: number) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discountedPrice', formData.discountedPrice);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);

    formData.images.forEach((img, index) => {
      formDataToSend.append('images', img.file); // <-- important
      formDataToSend.append(`altText${index}`, img.altText);
    });

    try {
      setLoading(true);
      if (mode === 'edit' && id) {
        await updateProduct(id, formDataToSend); // 👈 Axios API call
        setLoading(false);
        toast.success('Product updated successfully!');
        router.push('/dashboard/products');
        return;
      } else {
        await createProduct(formDataToSend); // 👈 Axios API call
      }
      setLoading(false);
      toast.success('Product created successfully!');
      router.push('/dashboard/products');
    } catch (error: any) {
      setLoading(false);
      console.error('Creation failed:', error);
      toast.error(error.message || 'Creation failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full text-white">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        // className="bg-gray-8 py-2 px-4 border rounded text-lg w-full"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
      />

      <div className="flex flex-row justify-between gap-8 items-center">
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          min="0"
          placeholder="Price"
          className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />

        <input
          name="discountedPrice"
          type="number"
          value={formData.discountedPrice}
          onChange={handleChange}
          min="0"
          placeholder="Discounted Price"
          className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
      >
        <option value="" className="">
          Select Category
        </option>
        {CATEGORY_OPTIONS.map(cat => (
          <option key={cat} value={cat} className="bg-gray-5">
            {cat.replace(/_/g, ' ')}
          </option>
        ))}
      </select>

      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        placeholder="Stock"
        className=" bg-gray-8 rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
      />

      {/* Image upload section */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Images</h4>
        {formData.images.map((img, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <Image
              src={img.url}
              alt={img.altText}
              className="w-16 h-16 object-cover rounded"
              width={64}
              height={64}
            />
            <span className="text-sm">{img.altText}</span>
            <button
              type="button"
              onClick={() => removeImageField(index)}
              className="btn btn-error btn-sm"
            >
              ✕
            </button>
          </div>
        ))}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 mb-4" />
      </div>

      <button
        type="submit"
        className="w-[20%] bg-blue flex justify-center ml-auto text-white rounded py-3 "
        disabled={loading}
      >
        {loading ? <ButtonLoader /> : mode === 'edit' ? 'Update Product' : 'Add Product'}
        {/* <ButtonLoader /> */}
      </button>
    </form>
  );
};

export default ProductForm;
