export type task = {
  id: any;
  task: string;
  owner: string;
  status: 'NEW' | 'IN PROGRES' | 'HOLD' | 'DONE';
  created: string;
  updated: string;
  isDone: boolean;
  isEdit: boolean;
}
