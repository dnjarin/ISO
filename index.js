// archivo: server.js
const http = require('http');

let a = 0, b = 1; // Variables para Fibonacci

const server = http.createServer((req, res) => {
  if (req.url === '/metodos') {
    // Devuelve un objeto diferente según el método
    let respuesta;
    switch (req.method) {
      case 'GET':
        respuesta = { mensaje: 'Respuesta GET' };
        break;
      case 'POST':
        respuesta = { mensaje: 'Respuesta POST' };
        break;
      case 'PUT':
        respuesta = { mensaje: 'Respuesta PUT' };
        break;
      case 'DELETE':
        respuesta = { mensaje: 'Respuesta DELETE' };
        break;
      default:
        respuesta = { error: 'Método no soportado' };
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(respuesta));

  } else if (req.url === '/aleatorio') {
    // Devuelve un número aleatorio
    const numero = Math.floor(Math.random() * 100) + 1;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ numero }));

  } else if (req.url === '/fibonacci') {
    // Devuelve el siguiente número de Fibonacci
    const siguiente = a;
    [a, b] = [b, a + b];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ fibonacci: siguiente }));

  } else {
    // Cualquier otra ruta → 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
  console.log('Rutas: /metodos, /aleatorio, /fibonacci');
});
