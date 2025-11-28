import prisma from '../config/database';
import { CreateTaskInput, UpdateTaskInput } from '../types/Task';

export class TaskModel {
    static async findAll() {
        return prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    static async findById(id: number) {
        return prisma.task.findUnique({
            where: { id }
        });
    }

    static async create(data: CreateTaskInput) {
        return prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status || 'new'
            }
        });
    }

    static async update(id: number, data: UpdateTaskInput) {
        return prisma.task.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date()
            }
        });
    }

    static async delete(id: number) {
        return prisma.task.delete({
            where: { id }
        });
    }
}