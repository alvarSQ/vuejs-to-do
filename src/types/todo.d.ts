declare interface ITodo {
    id: number,
    todo: string,
    completed: boolean,
    userId: number,
    isDeleted?: true,
    deletedOn?: string
}
