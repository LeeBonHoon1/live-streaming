import db from "@/lib/db";
import ListProduct from "@/components/list-product";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
};

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div>
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsPage;
