// Bộ não quản lý trạng thái đăng nhập của frontend 
// nó dùng Zustand store để lưu và điều khiển mọi thứ liên quan đến auth
// hiểu đơn giản thì : authService = người đi gọi server 
                    // authStore = người điều khiển trạng thái app

import {create} from "zustand"
// zustand: thư viện quản lý state 
import {toast} from "sonner"
import { authService } from "@/services/authService"; // service gọi API
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) =>({
// tạo một global state có thể dùng ở mọi component : set: cập nhật state /// get: lấy state hiện tại 

    accessToken: null,// state hiện tại đang lưu : accessToken, thông tin người dùng hiện tại , trạng thái có đang gọi API auth hay không 
    user: null,
    loading: false,


    clearState:()=>{// reset về trạng thái ban đầu (khi logout hoặc lỗi nặng )
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
        }finally{
            set({loading: false}); 
        }
    },
    signOut: async()=>{
        try {
            await authService.signOut();
            get().clearState();
            toast.success("logout thành công");
        } catch (error) {
            console.error(error);
            toast.error("lỗi khi logout"); 
        }
    }
}));