export interface Todo {
  id: string;
  text: string;
  user: string;
  completed: boolean;
}

export interface TodoRequestBody {
  todoText: string;
  user: string;
  completed?: boolean;
}