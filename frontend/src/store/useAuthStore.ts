import {create} from "zustand"
import {toast} from "sonner"
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) =>({
    accessToken: null,
    user: null,
    loading: false,
    clearState:()=>{
        set({accessToken: null, user: null, loading: false});
    },

    signUp: async( username, password, email, displayName) =>{
        try {
            set({loading: true});
            // gọi api
            await authService.signUp(username, password, email, displayName);
        } catch (error) {
            console.error(error);
            toast.error("Đăng ký không thành công");
        }finally{
            set({loading: false}); 
        }
    },
    signIn: async(email, password)=>{
        try{
            set({loading: true});
            const {accessToken} = await authService.signIn(email, password);
            set({accessToken});
            toast.success("đăng nhập thành công");
        }catch(error){
            console.error(error);
            toast.error("đăng nhập không thành công ")
        }
    },
    signOut: async()=>{
        try {
            get().clearState();
            await  authService.signOut();
            toast.success("logout thành công");
        } catch (error) {
            console.error(error);
            toast.error("lỗi khi logout"); 
        }
    }
}));