declare interface ITodo {
    id: number,
    todo: string,
    completed: boolean,
    userId: number,
    isEdit?: boolean
    isDeleted?: true,
    deletedOn?: string
}

