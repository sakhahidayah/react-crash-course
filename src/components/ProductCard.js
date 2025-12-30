import { useState } from "react";
import "./ProductCard.css";

export function ProductCard({ product, background = "slategray", onPurchase, onFavorite, isFavorite }) {
  const [showDetail, setShowDetail] = useState(false);
  function handleStock() {
    onPurchase(product.id, product.stockCount - 1); // handle changes product { stockCount } & send product id for validation
  }
  function handleDoubleBuy() {
    onPurchase(product.id, product.stockCount - 2); // handle changes product { stockCount } & send product id for validation
  }
  return (
    <article className="Container" style={{ background }}>
      <button className="Favorite" onClick={() => onFavorite(product.id)}>
        {isFavorite ? "⛊" : "⛉"}
      </button>
      <h2> {product.title} </h2>
      <img src={product.imageSrc} alt={product.title} width={128} height={128} />
      <p>
        Specification:
        <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? "Hide" : "Show"}</button>
      </p>
      {showDetail && (
        <ul>
          {product.specification.map((spec, index) => (
            <li className="Specification" key={index}>
              {spec}
            </li>
          ))}
        </ul>
      )}
      <Status stockCount={product.stockCount} />
      {product.stockCount > 0 && (
        <div>
          <p>Price : ${product.price}</p>
          <button onClick={handleStock} className="button">
            Buy
          </button>
        </div>
      )}
      {product.stockCount > 1 && (
        <button onClick={handleDoubleBuy} className="button">
          Buy 2
        </button>
      )}
    </article>
  );
}

function Status({ stockCount }) {
  const NotAvailableTemplate = <p className="NotAvailableStatus">Not Available</p>;
  const AvailableTemplate = <p className="AvailableStatus">{stockCount} Available</p>;
  return stockCount === 0 ? NotAvailableTemplate : AvailableTemplate;
}
