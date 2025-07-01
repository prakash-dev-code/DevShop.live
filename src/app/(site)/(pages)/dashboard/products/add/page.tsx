import ProductForm from '@/components/product/ProductForm';
import Link from 'next/link';

const AddProductPage = () => {
  return (
    <div className="md:p-6 ">
      <div className="flex flex-col gap-8  items-start ">
        <ul className="flex items-center gap-2">
          <li className="text-custom-sm hover:text-blue">
            <Link href="/dashboard">Home /</Link>
          </li>

          <li className="text-custom-sm last:text-blue capitalize">Add Product</li>
        </ul>
        <ProductForm mode="add" />
      </div>
    </div>
  );
};

export default AddProductPage;
