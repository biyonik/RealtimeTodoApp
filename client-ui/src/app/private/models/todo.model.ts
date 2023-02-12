import {UserModel} from "../../public/models/user.model";

export type Status = 'BACKLOG' | 'TODO' | 'DONE';
export type Complexity = 'EASY' | 'MEDIUM' | 'HARD';

export interface TodoModel {
  id?: string;
  createdBy?: UserModel;
  updatedBy?: UserModel;
  createdAt?: Date;
  updatedAt?: Date;
  status: Status;
  title: string;
  subTitle: string;
  text: string;
  complexity: Complexity;
}
