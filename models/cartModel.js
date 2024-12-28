class Cart {
    constructor() {
        this.items = []; // Almacena los productos en el carrito
    }

    addItem(productId, change, price, name) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += change; // Aumentar o disminuir la cantidad según el cambio
            // Si la cantidad es menor o igual a 0, eliminar el producto del carrito
            if (existingItem.quantity <= 0) {
                this.removeItem(productId); // Llamar a removeItem para eliminar el producto
            }
        } else {
            // Agregar nuevo producto al carrito, asegurando que el cambio sea al menos 1
            this.items.push({ productId, quantity: change > 0 ? change : 1, price, name });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId); // Filtrar el producto a eliminar
    }

    getCart() {
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    clearCart() {
        this.items = [];
    }
}

module.exports = new Cart(); // Exportar una instancia del carrito