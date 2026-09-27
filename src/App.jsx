import { useEffect, useState } from "react";
import MenuForm from "./components/MenuForm";
import MenuList from "./components/MenuList";

import {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./services/menuApi";

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET - Load menu items
  const loadMenuItems = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMenuItems();

      setMenuItems(data);
    } catch (error) {
      setError("Unable to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  // POST - Add menu item
  const handleAddItem = async (item) => {
    try {
      setError("");

      const newItem = await addMenuItem(item);

      setMenuItems((prevItems) => [
        ...prevItems,
        newItem,
      ]);

      setShowForm(false);
    } catch (error) {
      setError("Unable to add menu item.");
    }
  };

  // PUT - Update menu item
  const handleUpdateItem = async (item) => {
    try {
      setError("");

      const updatedItem = await updateMenuItem(
        editingItem.id,
        item
      );

      setMenuItems((prevItems) =>
        prevItems.map((menuItem) =>
          menuItem.id === editingItem.id
            ? updatedItem
            : menuItem
        )
      );

      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      setError("Unable to update menu item.");
    }
  };

  // DELETE - Delete menu item
  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteMenuItem(id);

      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      setError("Unable to delete menu item.");
    }
  };

  // Edit button
  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Add button
  const handleAddButton = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="small-title">
            RESTAURANT MANAGEMENT
          </p>

          <h1>Restaurant Menu</h1>

          <p className="header-description">
            Manage your restaurant menu items easily.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="refresh-btn"
            onClick={loadMenuItems}
          >
            ↻ Refresh
          </button>

          <button
            className="add-btn"
            onClick={handleAddButton}
          >
            + Add Menu Item
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <MenuForm
          onSubmit={
            editingItem
              ? handleUpdateItem
              : handleAddItem
          }
          editingItem={editingItem}
          onCancel={handleCancel}
        />
      )}

      <main className="menu-section">
        <div className="section-header">
          <div>
            <p className="small-title">MENU</p>
            <h2>Available Items</h2>
          </div>

          <span className="item-count">
            {menuItems.length} Items
          </span>
        </div>

        {loading ? (
          <div className="loading">
            Loading menu items...
          </div>
        ) : (
          <MenuList
            items={menuItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </main>
    </div>
  );
}

export default App;