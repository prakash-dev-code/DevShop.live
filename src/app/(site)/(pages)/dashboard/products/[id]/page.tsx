"use client";
import ProductForm from "@/components/product/ProductForm";
import { useParams } from "next/navigation";
import { useProduct } from "@/lib/hooks";

const EditProductPage = () => {
  const { id } = useParams() as { id: string };
  const { data: product, isLoading } = useProduct(id);

  if (isLoading || !product) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Product</h1>
      <ProductForm initialData={product} mode="edit" />
    </div>
  );
};

export default EditProductPage;
