require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/authRoutes");
const authRoutes = require("./routes/authRoutes"); // Ruta de los controladores
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { logoutUser } = require("./controllers/userController");
const path = require("path");
const app = express();
const PORT = 3000;

const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;

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

// Middelware para pasar datos de la sesión  a las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.session.user; // true si el usuario está autenticado
  res.locals.user = req.session.user || null; // Datos del usuario
  next();
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());



// Usar las rutas
app.use("/", authRoutes); // Puedes hacer que todas las rutas empiecen con /

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configurar las rutas
app.use("/api/users", userRoutes);
app.use('/api/contact', contactRoutes);

// Ruta carrito
app.use('/cart', cartRoutes);

// Rutas para los archivos HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "productos.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contacto.html"));
});

app.get("/velasAromaticas", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "velasAromaticas.html"));
});

app.get("/velasTematicas", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "velasTematicas.html"));
});

app.get("/velasDecorativas", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "velasDecorativas.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get("/logout", logoutUser);

// Servir vistas (opcional)
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html"))
);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
