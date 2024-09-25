export interface ILog {
  status: string
  time: string
}

export interface IBadges{
  id: number;
  name: string;
}

export interface IService{
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  badges: IBadges[];
}