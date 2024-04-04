"use-client";

import { CartProductType } from "@/app/product/[productId]/ProductDetail";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}
const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";
const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQuantityDecrease,
  handleQuantityIncrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQuantityDecrease} className={btnStyle}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQuantityIncrease} className={btnStyle}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
