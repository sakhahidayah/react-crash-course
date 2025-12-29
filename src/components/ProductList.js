const Styles = {
  List: { display: "flex", gap: "16px" },
};

export function ProductList({ children }) {
  return (
    <>
      <h2>Product</h2>
      <div style={Styles.List}>{children}</div>
    </>
  );
}
