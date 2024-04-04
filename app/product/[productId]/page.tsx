import { product } from "@/app/utils/product";
import Container from "../../components/Container";
import ProductDetails from "./ProductDetail";
import ListRating from "./ListRating";
interface IParams {
  productId?: string;
}
const Product = ({ params }: { params: IParams }) => {
  console.log(params);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
