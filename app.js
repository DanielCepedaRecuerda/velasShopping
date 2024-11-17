const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require('./routes/registerRoutes');  // Ruta de los controladores
const path = require("path");
const app = express();
const PORT = 3000;

const cors = require('cors');

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json()); // Para recibir datos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar formularios

// Usar las rutas
app.use('/api', registerRoutes); // Puedes hacer que todas las rutas empiecen con /api



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
