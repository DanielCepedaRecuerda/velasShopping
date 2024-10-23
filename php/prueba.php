$host = "velasshopping.c9q06cosmho9.eu-west-3.rds.amazonaws.com";
$user = "velasShoping";
$password = "velasShoping2024";
$dbname = "velasshoping"; // Reemplaza con tu nombre de base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conectado exitosamente";
