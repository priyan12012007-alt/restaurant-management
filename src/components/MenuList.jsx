import MenuCard from "./MenuCard";

function MenuList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-message">
        <h3>No menu items found</h3>
        <p>Add a new menu item to get started.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MenuList;