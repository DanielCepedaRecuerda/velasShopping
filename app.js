require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require('./routes/cartRoutes');
const velasRoutes = require('./routes/velasRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const productsRoutes = require('./routes/productsRoutes');
const { logoutUser  } = require("./controllers/userController");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'Velasshoping',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Usar "secure" en producción (HTTPS)
    },
}));

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para pasar datos de la sesión a las vistas
app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.user; // true si el usuario está autenticado
    res.locals.user = req.session.user || null; // Datos del usuario
    next();
});

// Rutas
app.use("/", userRoutes);
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
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
});
app.get("/logout", logoutUser );

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});