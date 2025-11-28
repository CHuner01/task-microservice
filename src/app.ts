import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './swagger';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Routes
app.use('/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Service is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

export default app;