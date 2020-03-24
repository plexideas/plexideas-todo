export type task = {
  _id: any;
  text: string;
  owner: string;
  status: 'NEW' | 'IN PROGRES' | 'HOLD' | 'DONE';
  created: string;
  updated: string;
  isDone: boolean;
  isEdit: boolean;
}
