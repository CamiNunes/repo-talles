/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext} from 'react';
import {IUser} from 'src/@types/app';

const UserContext = createContext<[IUser, React.Dispatch<React.SetStateAction<IUser>>]>([] as any);

export default UserContext;
