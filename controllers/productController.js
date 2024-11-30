const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    'neo4j+s://2bb6824d.databases.neo4j.io:7687', 
    neo4j.auth.basic('neo4j', '3q-7vwOcsjqvJShaDRA3myHMNpojHPr7r0lkGfNhRmI') // 
);

// Crear producto
exports.createProduct = async (req, res) => {
    const session = driver.session(); // Crear sesión en cada solicitud
    const { name, price, category } = req.body;
    const id = uuidv4();
    try {
        const result = await session.run(
            'CREATE (p:Product {id: $id, name: $name, price: $price, category: $category}) RETURN p',
            { id, name, price, category }
        );
        res.status(201).json(result.records[0].get('p').properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close(); // Cierra la sesión al finalizar
    }
};

// Leer producto
exports.getProduct = async (req, res) => {
    const session = driver.session(); // Crear sesión en cada solicitud
    const { id } = req.params;
    try {
        const result = await session.run(
            'MATCH (p:Product {id: $id}) RETURN p',
            { id }
        );
        if (result.records.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(result.records[0].get('p').properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close(); // Cierra la sesión al finalizar
    }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
    const session = driver.session(); // Crear sesión en cada solicitud
    const { id } = req.params;
    const { name, price, category } = req.body;
    try {
        const result = await session.run(
            'MATCH (p:Product {id: $id}) SET p.name = $name, p.price = $price, p.category = $category RETURN p',
            { id, name, price, category }
        );
        if (result.records.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(result.records[0].get('p').properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close(); // Cierra la sesión al finalizar
    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    const session = driver.session(); // Crear sesión en cada solicitud
    const { id } = req.params;
    try {
        const result = await session.run(
            'MATCH (p:Product {id: $id}) DELETE p',
            { id }
        );
        if (result.summary.counters.updates().nodesDeleted === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close(); // Cierra la sesión al finalizar
    }
};
