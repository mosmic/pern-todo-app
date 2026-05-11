import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../shared/models";
import api from "../shared/api";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data as Todo[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch todos",
      );
    }
  },
);

export const createTodo = createAsyncThunk(
  "todos/create",
  async (todo: { title: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", todo);
      return response.data as Todo;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create todo",
      );
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete todo",
      );
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (
    todosSlice: {
      id: number;
      title: string;
      description?: string;
      status: "pending" | "skipped" | "completed";
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/todos/${todosSlice.id}`, todosSlice);
      return response.data as Todo;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update todo",
      );
    }
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // We will add reducers here later
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default todosSlice.reducer;
