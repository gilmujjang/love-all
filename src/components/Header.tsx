const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "white",
        borderBottom: "1px solid gainsboro",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: 24, color: "deepskyblue" }}>
        Love All
      </div>
    </header>
  );
};

export default Header;
