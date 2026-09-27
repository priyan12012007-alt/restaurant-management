import { useEffect, useState } from "react";

function MenuForm({ onSubmit, editingItem, onCancel }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setPrice(editingItem.price);
      setAvailability(
        editingItem.availability ? "true" : "false"
      );
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setAvailability("");
    }

    setError("");
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    if (price === "" || Number(price) <= 0) {
      setError("Price must be a positive number");
      return;
    }

    if (availability === "") {
      setError("Please select availability");
      return;
    }

    const item = {
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      availability: availability === "true",
    };

    onSubmit(item);

    if (!editingItem) {
      setName("");
      setCategory("");
      setPrice("");
      setAvailability("");
    }
  };

  return (
    <div className="form-section">
      <h2>
        {editingItem ? "Edit Menu Item" : "Add Menu Item"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chicken Biryani"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Main Course"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="250"
          />
        </div>

        <div className="form-group">
          <label>Availability</label>

          <select
            value={availability}
            onChange={(e) =>
              setAvailability(e.target.value)
            }
          >
            <option value="">Select availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingItem ? "Update Item" : "Add Item"}
          </button>

          {editingItem && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MenuForm;