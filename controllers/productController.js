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



export { getProduct, getProductById, getProductsByCategory, getProductsByPriceRange };