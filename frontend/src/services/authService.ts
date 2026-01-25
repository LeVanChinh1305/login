import api from "@/lib/axios"


// tạo một object chứa các hàm liên quan đến đăng nhập
// đây là bộ điều khiển đăng nhập của app 
export const authService = {
    
    signUp: async ( username: string, password: string, email: string, displayName: string )=>{
        const res = await api.post("/auth/signup",
            {username, password, email, displayName},
            {withCredentials: true}
        );
        return res.data;
    },
    signIn: async ( email: string, password: string,)=>{
        const res = await api.post(
            "/auth/signin",
            {email, password},
            {withCredentials: true}
        );
        return res.data; 
    },

    signOut: async()=>{
        const res = await api.post(
            "/auth/signout",
            {},
            {withCredentials: true}
        );
        return res.data;
    },
};