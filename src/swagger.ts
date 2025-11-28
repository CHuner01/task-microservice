export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Task Service API',
        version: '1.0.0',
        description: 'A simple REST API for task management',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    tags: [
        {
            name: 'Tasks',
            description: 'Task management endpoints',
        },
    ],
    paths: {
        '/tasks': {
            get: {
                tags: ['Tasks'],
                summary: 'Get all tasks',
                responses: {
                    200: {
                        description: 'List of all tasks',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/Task',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateTaskInput',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Task created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Task' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/tasks/{id}': {
            get: {
                tags: ['Tasks'],
                summary: 'Get task by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'Task ID',
                    },
                ],
                responses: {
                    200: {
                        description: 'Task found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Task' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Task not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Tasks'],
                summary: 'Update a task',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'Task ID',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdateTaskInput',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Task updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Task' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Bad request',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    404: {
                        description: 'Task not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['Tasks'],
                summary: 'Delete a task',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'Task ID',
                    },
                ],
                responses: {
                    200: {
                        description: 'Task deleted successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string', example: 'Task deleted successfully' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Task not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                    500: {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Task: {
                type: 'object',
                required: ['id', 'title', 'status', 'createdAt', 'updatedAt'],
                properties: {
                    id: {
                        type: 'integer',
                        description: 'The auto-generated id of the task',
                        example: 1,
                    },
                    title: {
                        type: 'string',
                        description: 'The title of the task',
                        example: 'Learn Docker',
                    },
                    description: {
                        type: 'string',
                        description: 'The task description',
                        example: 'Study containerization',
                    },
                    status: {
                        type: 'string',
                        enum: ['new', 'done'],
                        description: 'Task status',
                        example: 'new',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Task creation timestamp',
                        example: '2023-07-20T10:00:00.000Z',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Task last update timestamp',
                        example: '2023-07-20T10:00:00.000Z',
                    },
                },
            },
            CreateTaskInput: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: {
                        type: 'string',
                        description: 'The title of the task',
                        example: 'Learn Docker',
                    },
                    description: {
                        type: 'string',
                        description: 'The task description',
                        example: 'Study containerization',
                    },
                    status: {
                        type: 'string',
                        enum: ['new', 'done'],
                        description: 'Task status',
                        example: 'new',
                    },
                },
            },
            UpdateTaskInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'The title of the task',
                        example: 'Updated task title',
                    },
                    description: {
                        type: 'string',
                        description: 'The task description',
                        example: 'Updated description',
                    },
                    status: {
                        type: 'string',
                        enum: ['new', 'done'],
                        description: 'Task status',
                        example: 'done',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    error: {
                        type: 'string',
                        example: 'Error message description',
                    },
                },
            },
        },
    },
};