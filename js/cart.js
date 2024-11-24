document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
  
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-product-id');
        const quantity = event.target.getAttribute('data-quantity');
        
        addToCart(productId, quantity);
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
  