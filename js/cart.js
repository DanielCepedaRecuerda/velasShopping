document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
      button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-product-id');
          const quantity = event.target.getAttribute('data-quantity');
          
          addToCart(productId, quantity);
      });
  });

  // Agregar un evento para los botones de eliminar del carrito
  const removeButtons = document.querySelectorAll('.remove-from-cart');
  removeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-product-id');
          removeFromCart(productId);
      });
  });
});

function addToCart(productId, quantity) {
  fetch('/cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          productId: productId,
          quantity: quantity,
      }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Producto añadido al carrito:', data);
  })
  .catch(error => console.error('Error al añadir al carrito:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
      button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-product-id');
          const quantity = event.target.getAttribute('data-quantity');
          
          addToCart(productId, quantity);
      });
  });

  // Agregar un evento para los botones de eliminar del carrito
  const removeButtons = document.querySelectorAll('.remove-btn'); // Cambia a 'remove-btn'
  removeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-product-id');
          removeFromCart(productId);
      });
  });
});

function removeFromCart(productId) {
  fetch(`/cart/${productId}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al eliminar el producto del carrito');
      }
      return response.json();
  })
  .then(updatedCart => {
      console.log('Carrito actualizado:', updatedCart);
      // Aquí puedes actualizar la interfaz de usuario para reflejar el carrito actualizado
      const productRow = document.querySelector(`.product-row[data-product-id="${productId}"]`);
      if (productRow) {
          productRow.remove(); // Eliminar la fila del producto del DOM
      }
  })
  .catch(error => console.error('Error:', error));
}