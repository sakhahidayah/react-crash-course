import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { ProductFilter } from "./components/ProductFilter.js";
import { ProductCard } from "./components/ProductCard";
import { ProductList } from "./components/ProductList.js";
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
  const products = [
    {
      id: 1,
      imageSrc: "images/iphone.png",
      title: "iPhone 15 Pro",
      specification: ["A17 Pro chip with 6-core GPU", "3x or 5x Telephoto camera", "Up to 29 hours video playback"],
      price: 999,
      stockCount: 10,
    },
    {
      id: 2,
      imageSrc: "images/airpods.png",
      title: "AirPods Pro 2",
      specification: ["Noise Cancellation", "Dust, sweat, and water resistant", "Up to 6 hours of listening"],
      price: 249,
      stockCount: 0,
    },
    {
      id: 3,
      imageSrc: "images/apple-watch.png",
      title: "Apple Watch 9",
      specification: ["45mm or 41mm case size", "Always-On Retina display", "Up to 18 hours normal use"],
      price: 399,
      stockCount: 199,
    },
  ];
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
  function onPurchase(product) {
    alert(`You Clicked ${product.title} , which the price is $${product.price}`);
  }
  function handleFavorites(productId) {
    if (favorites.includes(productId)) {
      // remove
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
      // alert("Product has Removed");
    } else {
      // add
      setFavorites((prevFavorites) => [...prevFavorites, productId]);
      // alert("Product has Added");
    }
  }
  return (
    <div className="App">
      <ProductList>
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
