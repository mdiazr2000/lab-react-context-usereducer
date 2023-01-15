import { CartState } from "../../Context/Context";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./home.scss";
import Filters from "../Filters/Filters";

const Home: React.FC = () => {
  const {
    state: { products },
    stateProduct: { byStock, byFastDelivery, byRating, searchQuery, sort },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort == "lowToHigh"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price)
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
        sortedProducts = sortedProducts.filter(
            (prod) => prod.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
