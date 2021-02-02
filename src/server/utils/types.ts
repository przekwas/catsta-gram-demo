import { Request } from 'express';
import { UsersTable } from '../db/models';

export interface IPayload {
    userid: string;
    email: string;
    username: string;
}

export interface ReqUser extends Request {
    user?: UsersTable;
}