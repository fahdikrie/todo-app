import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TodoState = {
  todos: Todo[];

  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  clearTodos: () => void;
  updateTodoStatus: (id: string, isCompleted: boolean) => void;
};

const useTodo = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todo: Todo) => {
        set(() => ({
          todos: [...get().todos, todo],
        }));
      },

      removeTodo: (id: string) => {
        set(() => ({
          todos: get().todos.filter((todo) => todo.id !== id),
        }));
      },

      clearTodos: () => {
        set({ todos: [] });
      },

      updateTodoStatus: (id: string, isCompleted: boolean) => {
        set(() => ({
          todos: get().todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
          ),
        }));
      },
    }),
    { name: 'to-do' }
  )
);

export default useTodo;
