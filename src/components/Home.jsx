import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"

export function Home() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const handleAddProduct = () => {
    if (!productName || !productPrice) {
      alert("aplease Provide both product name and price")
      return;
    }

    if (products.some((product) => product.name === productName)) {
      alert("Product alreasy exists");
      return;
    }

    const newProduct = { name: productName, price: productPrice };
    const updatedProducts = [...products, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setProductName("");
    setProductPrice("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveProduct = (productName) => {
    const updatedProducts = products.filter(product => product.name !== productName);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h2>Welcome to the Product Home Page</h2>

      <div className="card">
        <h3>Add a product</h3>
        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="card">
        <input type="text" placeholder="Search Products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="table-container">
        <h2>Product List</h2>
        {
          filteredProducts.length === 0 ? (
            <p className="no-products"> No Product Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <button className="remove-btn" onClick={() => handleRemoveProduct(product.name)}> X </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>

    </div>
  )


}