import React from 'react';
import './App.css';

function App() {
  // Lista de productos
  const productos = [
    {
      id: 10,
      nombre: "Vela Aromática",
      descripcion: "Aroma de lavanda, ideal para relajarse.",
      precio: 10.00,
      imagen: "./images/vela1.jpg"
    },
    {
      id: 11,
      nombre: "Vela de Soja",
      descripcion: "Hecha con cera natural, sin tóxicos.",
      precio: 12.00,
      imagen: "./images/vela2.jpg"
    },
    {
      id: 12,
      nombre: "Vela de Cera de Abeja",
      descripcion: "Proporciona una luz cálida y natural.",
      precio: 15.00,
      imagen: "./images/velaDeCeraDeAbeja.jpg"
    },
    {
      id: 13,
      nombre: "Vela Flotante",
      descripcion: "Perfecta para decoraciones en el agua.",
      precio: 8.00,
      imagen: "./images/velaEnAgua.jpg"
    },
    {
      id: 14,
      nombre: "Vela Decorativa",
      descripcion: "Diseños únicos temáticos.",
      precio: 20.00,
      imagen: "./images/velasHalloween.jpg"
    },
    {
      id: 15,
      nombre: "Vela Aromática de Café",
      descripcion: "Un aroma delicioso que te despierta.",
      precio: 14.00,
      imagen: "./images/velaDeCafe.jpg"
    },
    {
      id: 16,
      nombre: "Vela decorativa de navidades",
      descripcion: "",
      precio: 14.00,
      imagen: "./images/velaNavidades.jpg"
    },
    {
      id: 17,
      nombre: "Vela decorativa de San Valentín",
      descripcion: "",
      precio: 10.00,
      imagen: "./images/velaSanValentin.jpg"
    },
    {
      id: 18,
      nombre: "Vela decorativa con forma de rosa",
      descripcion: "",
      precio: 14.00,
      imagen: "./images/velaFormaRosas.jpg"
    }
  ];

  return (
    <div>
      <header>
        <h1>Velas Shopping</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="divBotonAcceso" id="divBotonAcceso">
          <a href="/login">
            <button id="botonAcceso" className="botonAcceso">Acceso / Registro</button>
          </a>
        </div>
        <div className="divBotonLogout" id="divBotonLogout">
          <a href="/logout">
            <button id="botonLogout" className="botonAcceso">Cerrar Sesión</button>
          </a>
        </div>
        <div className="social-links">
          <a href="#" className="fa fa-instagram"></a>
          <a href="#" className="fa fa-twitter"></a>
        </div>
      </header>

      <main>
        <section className="product-grid">
          {productos.map((producto) => (
            <article className="product" key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <span className="price">${producto.precio.toFixed(2)}</span>
              <form action="/cart" method="POST">
                <input type="hidden" name="productId" value={producto.id} />
                <input type="number" name="quantity" value="1" min="1" />
                <button type="submit">Agregar al carrito</button>
              </form>
            </article>
          ))}
        </section>

        <a href="/cart" className="floating-cart" id="floating-cart">
          <div className="cart-icon">
            <img src="/images/iconoPágina.jpg" alt="Vela del carrito" className="velaCarrito" />
            <span className="item-count" id="item-count">-</span>
          </div>
        </a>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2024 Tienda de Velas. Todos los derechos reservados.</p>
          <nav>
            <ul>
              <li><a href="">Términos y Condiciones</a></li>
              <li><a href="">Política de Privacidad</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Sobre Nosotros</a></li>
            </ul>
          </nav>
          <p>Contacto: <span><a href="mailto:tusvelasshopping@gmail.com">tusvelasshopping@gmail.com</a></span></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
