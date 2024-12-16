require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Ruta de los controladores
const cartRoutes = require('./routes/cartRoutes');
const velasRoutes = require('./routes/velasRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { logoutUser } = require("./controllers/userController");
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
console.log('Servidor iniciado');
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

// Configuración de las rutas estáticas (Imágenes, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
// Middelware para pasar datos de la sesión a las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.session.user; // true si el usuario está autenticado
  res.locals.user = req.session.user || null; // Datos del usuario
  next();
});


// Usar las rutas
app.use("/", authRoutes); // Hacer que todas las rutas empiecen con /

// Rutas para los archivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "productos.html"));
});

app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contacto.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get("/logout", logoutUser);

// Configurar las rutas
app.use('/api/contact', contactRoutes);
app.use('/velas', velasRoutes);
app.use('/cart', cartRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});