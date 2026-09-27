const API_URL = "http://localhost:5000/menuItems";

export const getMenuItems = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }

  return response.json();
};

export const addMenuItem = async (item) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to add menu item");
  }

  return response.json();
};

export const updateMenuItem = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update menu item");
  }

  return response.json();
};

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete menu item");
  }

  return true;
};