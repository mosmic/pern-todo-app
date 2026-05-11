export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: "pending" | "skipped" | "completed";
}
