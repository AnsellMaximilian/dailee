export interface Task {
    id: string;
    user: string;
    title: string;
    description: string;
    timeFrame: string;
}

export interface Message {
    type: 'error' | 'info' | 'success';
    content: string;
}