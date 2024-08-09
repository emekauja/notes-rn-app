import { ITodo } from '@/types/todos';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [] as ITodo[];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: {
      reducer: (state, action: PayloadAction<ITodo>) => {
        state.push(action.payload);
      },
      prepare: ({
        title,
        description,
      }: {
        title: string;
        description: string;
      }) => ({
        payload: {
          id: uuidv4(),
          title,
          description,
          date: new Date(),
          completed: false,
        } as ITodo,
      }),
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              description: action.payload.description,
              date: new Date(),
            }
          : todo
      );
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { createTodo, deleteTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
