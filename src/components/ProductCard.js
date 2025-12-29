import { useState } from "react";
import "./ProductCard.css";

export function ProductCard({ product, background = "slategray", onPurchase }) {
  const [stockCount, setStockCount] = useState(product.stockCount);
  const [showDetail, setShowDetail] = useState(false);
  function handleStock() {
    setStockCount((prevStockCount) => prevStockCount - 1);
    onPurchase(product);
  }
  function handleDoubleBuy() {
    setStockCount((prevStockCount) => prevStockCount - 1);
    setStockCount((prevStockCount) => prevStockCount - 1);
  }
  return (
    <article className="Container" style={{ background }}>
      <h2> {product.title} </h2>
      <img src={product.imageSrc} alt="iPhone 15 Pro" width={128} height={128} />
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
      <Status stockCount={stockCount} />
      {stockCount > 0 && (
        <div>
          <p>Price : ${product.price}</p>
          <button onClick={handleStock} className="button">
            Buy
          </button>
        </div>
      )}
      {stockCount > 1 && (
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
