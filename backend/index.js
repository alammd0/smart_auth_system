
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

connectDB();

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
