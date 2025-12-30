import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { ProductFilter } from "./components/ProductFilter.js";
import { ProductCard } from "./components/ProductCard";
import { ProductList } from "./components/ProductList.js";
import { products as productData } from "./data/Products.js"; // import product data
import "./App.css";

const Styles = {
  ListDevider: {
    borderColor: "slategray",
  },
  ListTitle: {
    margin: "8px",
  },
};

function App() {
  const [products, setProducts] = useState(productData); // set product as state
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: "other value",
  });
  const [favorites, setFavorites] = useState([]);
  function handleFilter(key, value) {
    setFilters((prevFilter) => ({
      ...prevFilter,
      price: {
        ...prevFilter.price,
        [key]: value,
      },
    }));
  }
  function onPurchase(productId, stockCount) {
    // receive data from children {product id and stockCount }\
    // mapping data product from children , and pass it to state [setProducts]
    setProducts((prevProducts) => prevProducts.map((product) => (product.id === productId ? { ...product, stockCount } : product)));
  }
  function handleFavorites(productId) {
    if (favorites.includes(productId)) {
      // remove
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
      alert("Product has Removed");
    } else {
      // add
      setFavorites((prevFavorites) => [...prevFavorites, productId]);
      alert("Product has Added");
    }
  }
  return (
    <div className="App">
      <ProductList>
        {/* Send product to children components */}
        {products.map((product, index) => (
          <ProductCard key={index} product={product} onPurchase={onPurchase} onFavorite={handleFavorites} isFavorite={favorites.includes(product.id)} />
        ))}
      </ProductList>
      <h2> Product wich cost up to $500 </h2>
      <ProductFilter filters={filters} onFilter={handleFilter} />
      {products
        .filter(({ price }) => price >= filters.price.min && price <= filters.price.max)
        .map(({ title, price }) => (
          <Fragment key={title}>
            <hr style={Styles.ListDevider} />
            <li style={Styles.ListTitle}>
              {title} Cost {price}
            </li>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
