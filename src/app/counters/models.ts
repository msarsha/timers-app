export interface Timer {
  id: string;
  time: number;
  paused?: boolean;
  elapsed?:number;
}
