import pool from '../DB/db.mjs';

const getProduct = async (req, res) => {
    try {
        const selectQuery = "SELECT * FROM products";
        const result = await pool.query(selectQuery);

        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: 'No products found' });
        }
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const selectQuery = "SELECT * FROM products WHERE product_id = $1";
        const result = await pool.query(selectQuery, [id]);

        if (result.rowCount === 1) {
            return res.status(200).json(result.rows[0]);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category;

        if (!category) {
            return res.status(400).json({ error: 'Category query parameter is required' });
        }

        const selectQuery = "SELECT * FROM products WHERE category = $1";
        const result = await pool.query(selectQuery, [category]);

        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: 'No products found in this category' });
        }
    } catch (error) {
        console.error('Error caught:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductsByPriceRange = async (req, res) => {
    try {
        const min = parseFloat(req.query.min);
        const max = parseFloat(req.query.max);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ error: 'Invalid price range' });
        }

        const selectQuery = "SELECT * FROM products WHERE price >= $1 AND price <= $2";
        const result = await pool.query(selectQuery, [min, max]);

        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: 'No products found for the given price range' });
        }
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createNewProduct = async (req, res) => {
    try {
        const newProduct = req.body;

        if (!newProduct.product_name || !newProduct.price || !newProduct.category || !newProduct.star_rating || !newProduct.description || !newProduct.product_code || !newProduct.imageurl) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const insertQuery = `
            INSERT INTO products (product_name, price, category, star_rating, description, product_code, imageurl)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            newProduct.product_name,
            newProduct.price,
            newProduct.category,
            newProduct.star_rating,
            newProduct.description,
            newProduct.product_code,
            newProduct.imageurl
        ];

        await pool.query(insertQuery, values);
        return res.status(201).send({ message: 'Product Created Successfully' });
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

const updateProductStarRating = async (req, res) => {
    try {
        const id = req.params.id;
        const { price, star_rating } = req.body;

        const updateQuery = "UPDATE products SET price = $1, star_rating = $2 WHERE product_id = $3";
        const values = [price, star_rating, id];
        await pool.query(updateQuery, values);

        return res.status(200).send("Product Updated Successfully");
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteQuery = "DELETE FROM products WHERE product_id = $1";
        const result = await pool.query(deleteQuery, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        } else {
            return res.status(204).send(`Product deleted with id ${id}`);
        }
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

export { getProduct, getProductById, getProductsByCategory, getProductsByPriceRange, createNewProduct, updateProductStarRating, deleteProductById };

