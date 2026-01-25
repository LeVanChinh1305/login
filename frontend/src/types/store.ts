import type { User } from "./user";

// authState: bản thiết kế của useAUthStore : mô tả hình dạng của auth store đang dùng với zustand
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