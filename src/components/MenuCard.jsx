function MenuCard({ item, onEdit, onDelete }) {
  return (
    <div className="menu-card">
      <div className="menu-card-header">
        <div>
          <h3>{item.name}</h3>
          <p>{item.category}</p>
        </div>

        <span className={item.availability ? "available" : "unavailable"}>
          {item.availability ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="menu-card-price">
        ₹{item.price}
      </div>

      <div className="menu-card-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MenuCard;