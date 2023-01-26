import { createContext } from 'react';
import { SupashipUserInfo} from "./use_session";


export const UserContext = createContext<SupashipUserInfo>({session: null, profile: null, });