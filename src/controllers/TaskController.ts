import { Request, Response } from 'express';
import { TaskModel } from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../types/Task';

export class TaskController {
    static async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await TaskModel.findAll();
            res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            console.error('Error getting tasks:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid task ID'
                });
            }

            const task = await TaskModel.findById(id);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    error: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error('Error getting task:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async createTask(req: Request<{}, {}, CreateTaskInput>, res: Response) {
        try {
            const { title, description, status } = req.body;

            if (!title || title.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Title is required and cannot be empty'
                });
            }

            if (status && !['new', 'done'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: 'Status must be either "new" or "done"'
                });
            }

            const task = await TaskModel.create({
                title: title.trim(),
                description: description?.trim(),
                status
            });

            res.status(201).json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async updateTask(req: Request<{ id: string }, {}, UpdateTaskInput>, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid task ID'
                });
            }

            const { title, description, status } = req.body;

            if (title !== undefined && title.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Title cannot be empty'
                });
            }

            if (status && !['new', 'done'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: 'Status must be either "new" or "done"'
                });
            }

            const existingTask = await TaskModel.findById(id);
            if (!existingTask) {
                return res.status(404).json({
                    success: false,
                    error: 'Task not found'
                });
            }

            const updateData: UpdateTaskInput = {};
            if (title !== undefined) updateData.title = title.trim();
            if (description !== undefined) updateData.description = description.trim();
            if (status !== undefined) updateData.status = status;

            const task = await TaskModel.update(id, updateData);

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async deleteTask(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid task ID'
                });
            }

            const existingTask = await TaskModel.findById(id);
            if (!existingTask) {
                return res.status(404).json({
                    success: false,
                    error: 'Task not found'
                });
            }

            await TaskModel.delete(id);

            res.status(200).json({
                success: true,
                message: 'Task deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}