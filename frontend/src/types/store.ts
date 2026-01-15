import type { User } from "./user";

export interface AuthState{
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    clearState:()=> void;

    signUp:(
        username: string,
        password: string,
        email: string,
        displayName: string
    )=> Promise<void>;

    signIn:(
        email: string,
        password: string
    )=>Promise<void>;

    signOut:()=>Promise<void>;

    
}