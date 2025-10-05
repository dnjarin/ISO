const http = require('http');

let a = 0, b = 1;

// --- Funciones ---
function manejarMetodos(req) {
  switch (req.method) {
    case 'GET': return { mensaje: 'Respuesta a GET' };
    case 'POST': return { mensaje: 'Respuesta a POST' };
    case 'PUT': return { mensaje: 'Respuesta a PUT' };
    case 'DELETE': return { mensaje: 'Respuesta a DELETE' };
    default: return { error: 'Método no soportado' };
  }
}

function numeroAleatorio() {
  return { numero: Math.floor(Math.random() * 100) + 1 };
}

function siguienteFibonacci() {
  const siguiente = a;
  [a, b] = [b, a + b];
  return { fibonacci: siguiente };
}

function paginaInicio() {
  return {
    mensaje: 'Bienvenido al servidor Node.js de la Unidad 1',
    rutas: {
      '/metodos': 'Devuelve diferentes objetos según el método HTTP (GET, POST, PUT, DELETE)',
      '/aleatorio': 'Devuelve un número entero aleatorio',
      '/fibonacci': 'Devuelve el siguiente número de la secuencia de Fibonacci',
    }
  };
}

// --- Servidor ---
const server = http.createServer((req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(paginaInicio()));

    } else if (req.url === '/metodos') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(manejarMetodos(req)));

    } else if (req.url === '/aleatorio') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(numeroAleatorio()));

    } else if (req.url === '/fibonacci') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(siguienteFibonacci()));

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }

  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error interno del servidor', detalle: err.message }));
  }
});

// --- Iniciar servidor ---
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');
  console.log('  [GET,POST,PUT,DELETE] /metodos');
  console.log('  GET /aleatorio');
  console.log('  GET /fibonacci');
  console.log('  GET /');
});
