import pool from '../DB/db.mjs'
//end point to retrieve all the products
const getProduct = async (req, res) => {
    try {
        console.log("Inside ")
        const selectQuery = "select  * from products";

        const result = await pool.query(selectQuery);
        console.log('Result' + JSON.stringify(result));

        if(result != null) {
            return res.status(200).json(result);
        }

        if(res.status === 200) {
            return res.status(200).json(result.rows);
        }
        else {
            console.log("Couldn't retrieve data")
            return res.status(400).json({error: 'Data not found'});
        }

    } catch (error) {
        console.log("Error retrieving data " + error?.message);
        return res.status(400).json({error: 'Data not found'});
    }
}

const getProductById = async(req, res) => {
    const id = req.params.id;

    const selectQuery = `select * from products where product_id = ${id}`;
    const result = await pool.query(selectQuery);
    if (res.statusCode === 200){
        if(result.rowCount === 1){
            return res.status(200).json(result.rows)
        }
        else{
            return res.status(404).json({ error: 'Id Not Found'})
        }
    }
    else {
        return res.status(400).json({error: 'Error Retrieving Data'})
    }
}

// const getProductsByCategory = async (req, res) => {
//     try {
//         const category = req.query.category;
//         const selectQuery = `select * from products where category=${category}`;
//         const result = await pool.query(selectQuery);
//         if(res.statusCode === 200){ 
//             if(result.rowCount > 0){
//                 return res.status(200).json(result.rows)
//             }
//             else{
//                 return res.status(404).json({ error: 'No products found in this category'})
//             }
//         }
//         else {
//             return res.status(400).json({error: 'Error Retrieving Data'})
//         }
//     } catch (error) {
//         console.log("Error Caught" + error?.message);
//         return res.status(500).json({error: 'Internal server error'})
//     }   
// }

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category;

        // Check if the category is provided
        if (!category) {
            return res.status(400).json({ error: 'Category query parameter is required' });
        }

        // Use parameterized query to prevent SQL injection
        const selectQuery = 'SELECT * FROM products WHERE category = $1';
        const result = await pool.query(selectQuery, [category]);

        // Respond based on query result
        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: 'No products found in this category' });
        }

    } catch (error) {
        console.error('Error caught:', error.message); // Improved error logging
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

        const selectQuery = 'SELECT * FROM products WHERE price >= $1 AND price <= $2';
        const result = await pool.query(selectQuery, [min, max]);

        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ error: 'No products found for the given price range' });
        }
    } catch (error) {
        console.log("Error Caught: " + error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const createNewProduct = async (req, res) => {
//     try {
//         const newProduct = req.body;

//         // Validate Input
//         if (!newProduct.product_name || !newProduct.price || !newProduct.category || !newProduct.star_rating || !newProduct.description || !newProduct.product_code || !newProduct.imageurl) {
//             return res.status(400).json({ error: 'All Fields are required' });
//         }

//         const insertQuery = `INSERT into practice.products(product_name, price, category, star_rating, description, product_code, imageurl) values('${newProduct.product_name}', '${newProduct.price}', '${newProduct.category}',  '${newProduct.star_rating}', '${newProduct.description}', '${newProduct.product_code}', '${newProduct.imageurl}');`

//         const result = await pool.query(insertQuery, [
//             newProduct.product_name,
//             newProduct.price,
//             newProduct.category,
//             newProduct.star_rating,
//             newProduct.description,
//             newProduct.product_code,
//             newProduct.imageurl
//         ]);

//         return res.status(201).send({ message: 'Product Created Successfully' });
//     } catch (error) {
//         console.error("Error Caught: " + error.message);
//         return res.status(500).json({ error: `Internal Server Error ${error.message}` });
//     }
// };

const createNewProduct = async (req, res) => {
    try {
        const newProduct = req.body;

        // Validate Input
        if (!newProduct.product_name || !newProduct.price || !newProduct.category || !newProduct.star_rating || !newProduct.description || !newProduct.product_code || !newProduct.imageurl) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Use parameterized query
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

        const result = await pool.query(insertQuery, values);

        return res.status(201).send({ message: 'Product Created Successfully' });
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};





export { getProduct, getProductById, getProductsByCategory, getProductsByPriceRange, createNewProduct };