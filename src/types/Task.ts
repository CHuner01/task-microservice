export type TaskStatus = 'new' | 'done';

export interface Task {
    id: number;
    title: string;
    description?: string | null;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateTaskInput = {
    title: string;
    description?: string;
    status?: TaskStatus;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;