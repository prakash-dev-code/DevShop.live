import ProductForm from "@/components/product/ProductForm";

const AddProductPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Product</h1>
      <ProductForm mode="add" />
    </div>
  );
};

export default AddProductPage;
