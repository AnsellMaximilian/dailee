export interface Task {
  id: string;
  user: string;
  title: string;
  description: string;
  timeFrame: string;
  importance: 1 | 2 | 3 | 4 | 5;
}

export interface Message {
  type: "error" | "info" | "success";
  content: string;
}
