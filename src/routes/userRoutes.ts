import { Router, Request, Response } from "express";
import pool from "../db/index";

const router = Router();

interface User {
    id?: number;
    name: string;
    email: string;
}

//Create a new user
// router.post('/users', async (req: Request<{},{}, User>, res: Response) => {
//     const { name, email } = req.body;
//     try {
//         const newUser = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
//         res.json(newUser.rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });

router.post('/users', async (req: Request<{},{}, User>, res: Response) => {
    const { name, email } = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO test_users (name, email) VALUES ($1, $2) RETURNING *', 
            [name, email]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        
        res.status(500).json({ error: 'Failed to create user', details: errorMessage });
    }
});

// Read all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const user = await pool.query('SELECT * FROM test_users');
        res.json(user.rows);
    } catch (error) {
        res.status(500).send('server error');
    }
});

// Read single user
router.get('/users/:id', async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await pool.query('SELECT * FROM test_users WHERE id = $1', [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).send('server error');
    }
});

// Update user
router.put('/users/:id', async (req: Request<{id: string}, {}, User>, res: Response) => {
    const { id } = req.params;
    const {name, email} = req.body;
    try {
        const user = await pool.query('UPDATE test_users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [req.body.name, req.body.email, id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// Delete user
router.delete('/users/:id', async(req: Request<{id:string}>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await pool.query('DELETE FROM test_users WHERE id = $1 RETURNING *', [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).send('server error');
    }
});

export default router;