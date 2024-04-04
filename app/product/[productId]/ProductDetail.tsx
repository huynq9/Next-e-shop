"use client";
import { Alert, Rating, Snackbar } from "@mui/material";
import Image from "next/image";
import { useCallback, useState } from "react";
import SetColor from "../../components/product/SetColor";
import SetQuantity from "../../components/product/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "../../components/product/ProductImage";

interface ProductDetailsProps {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const [showAlert, setShowAlert] = useState(false);
  console.log(cartProduct);
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 20) {
      return setShowAlert(true);
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);
  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return alert("?");
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-700 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly precision={0.5} />
          <div> {product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}{" "}
        </div>
        <Horizontal />
        <SetColor
          images={product.images}
          handleColorSelect={handleColorSelect}
          cartProduct={cartProduct}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQuantityDecrease={handleQuantityDecrease}
          handleQuantityIncrease={handleQuantityIncrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button label="Add To Cart" onClick={() => {}} custom="" />
        </div>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          This is a success Alert.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
