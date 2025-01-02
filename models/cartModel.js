class Cart {
  constructor() {
    this.items = []; // Almacena los productos en el carrito
  }

  addItem(productId, quantity, price, name) {
    const existingItem = this.items.find(
      (item) => item.productId === productId
    );
    if (existingItem) {
      // Aumentar la cantidad si el producto ya está en el carrito
      existingItem.quantity += quantity;
    } else {
      // Agregar nuevo producto al carrito
      this.items.push({ productId, quantity, price, name });
    }
  }

  removeItem(productId) {
    // Filtrar el producto a eliminar
    this.items = this.items.filter((item) => item.productId !== productId);
  }

  getCart() {
    return this.items;
  }

  getTotal() {
    return this.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  clearCart() {
    this.items = [];
  }
}

module.exports = new Cart(); // Exportar una instancia del carrito
