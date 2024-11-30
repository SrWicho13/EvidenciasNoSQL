const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
;

const driver = neo4j.driver(
    'neo4j+s://2bb6824d.databases.neo4j.io', // Protocolo correcto
    neo4j.auth.basic('neo4j', '3q-7vwOcsjqvJShaDRA3myHMNpojHPr7r0lkGfNhRmI')
);



const app = express();
app.use(bodyParser.json());

// Importar rutas
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Puerto y mensaje de inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Cerrar conexión al salir
process.on('exit', async () => {
    await driver.close();
});
