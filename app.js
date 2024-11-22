// /app.js
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const userRoutes = require("./routes/authRoutes");
const authRoutes = require('./routes/authRoutes');  // Ruta de los controladores
const path = require("path");
const app = express();
const PORT = 3000;

const cors = require('cors');

// Configuración del middleware express-session
app.use(session({
  secret: 'mi-secreto',  // Clave para firmar la cookie de sesión
  resave: false,         // No volver a guardar la sesión si no ha cambiado
  saveUninitialized: false,  // No guardar sesiones vacías
  cookie: { secure: false }  // Si es HTTPS, cambiar a true
}));

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json()); // Para recibir datos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar formularios

// Usar las rutas
app.use('/', authRoutes); // Puedes hacer que todas las rutas empiecen con /

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configurar las rutas
app.use("/api/users", userRoutes);

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

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Servir vistas (opcional)
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html"))
);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
