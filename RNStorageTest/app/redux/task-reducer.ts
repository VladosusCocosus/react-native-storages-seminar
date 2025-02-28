import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface Task {
    id: string
    title: string
    completed: boolean
}

interface State {
    tasks: Task[]
}

const initialState: State = {
    tasks: [],
}

const taskReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<Task>) => {
            const initial = { tasks: [] }

            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            }
        },
        complete: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id)

            if (taskIndex === -1) {
                return state
            }

            const task = state.tasks[taskIndex]

            return {
                ...state,
                tasks: [
                    ...state.tasks.slice(0, taskIndex),
                    {...task, completed: true},
                    ...state.tasks.slice(taskIndex + 1, state.tasks.length)
                ]
            }
        },
        reset: () => {
            return initialState
        }
    }
})

export const { complete, createTask, reset } = taskReducer.actions
export default taskReducer.reducer
