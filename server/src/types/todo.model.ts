export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TodoStatus;
  created_at: Date;
  updated_at: Date | null;
}

export enum TodoStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  SKIPPED = "skipped",
}
