 require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes"); // Ruta de los controladores
const cartRoutes = require('./routes/cartRoutes');
const velasRoutes = require('./routes/velasRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes'); // Asegúrate de que la ruta sea correcta
const productsRoutes = require('./routes/productsRoutes');
const { logoutUser } = require("./controllers/userController");
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const cors = require("cors");

// Configuración del middleware express-session
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,  // Esto protege la cookie de ser accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Usar "secure" en producción (HTTPS)
    },
  })
);

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json()); // Para recibir datos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar formularios

// Middleware de autenticación
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next(); // El usuario está autenticado, continuar
  } else {
    res.redirect('/login'); // Redirigir a la página de inicio de sesión
  }
};

// Usar el middleware en la ruta de checkout
router.get('/checkout', isAuthenticated, checkoutController.showCheckout);
// Configuración de las rutas estáticas (Imágenes, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
// Middelware para pasar datos de la sesión a las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.session.user; // true si el usuario está autenticado
  res.locals.user = req.session.user || null; // Datos del usuario
  next();
});


// Usar las rutas
app.use("/", userRoutes); // Hacer que todas las rutas empiecen con /
app.use('/velas', velasRoutes);
app.use('/cart', cartRoutes);
app.use('/productos', productsRoutes);
app.use('/', checkoutRoutes);

// Rutas para los archivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contacto.html')); // Asegúrate de que la ruta sea correcta
});
app.get("/logout", logoutUser);



// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});