import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React from "react"
import {z} from "zod" // thư viện dùng để định nghĩa và kiểm tra (validate) kiểu dữ liệu 
import {useForm} from "react-hook-form" // hook quản lý trạng thái form (giá trị , lỗi, trạng thái gửi, ....)
import {zodResolver} from "@hookform/resolvers/zod" //cầu nối giúp React Hook Form hiểu được các quy tắc của zod 
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router"
import {Link} from "react-router"

// định nghĩa Schema với zod 
// đây là nơi thiết lập " luật " cho form 
// zod sẽ kiểm tra dữ liệu từ trên xuống dưới 
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng không bỏ sót email") 
    .email("Email không đúng định dạng"),
    
  password: z
    .string()
    .min(1, "Vui lòng không bỏ sót mật khẩu"),

  /*
  .min(8, "Password phải ít nhất 8 ký tự")
  .max(50, "Password tối đa 50 ký tự")
  .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
  .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
  .regex(/[0-9]/, "Phải có ít nhất 1 số")
  .regex(/[!@#$%^&*]/, "Phải có ít nhất 1 ký tự đặc biệt");
  */
})
// trích xuất dữ liệu từ schema 
// tự động tạo ra một type từ schema của zod 
// giúp chúng ta không cần viết lại 1 interface thủ công, tránh sai sót đồng bộ 
type LoginFormValues = z.infer<typeof loginSchema> 



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {signIn} = useAuthStore();
  const navigate = useNavigate(); 

  // --- 3. KHỞI TẠO HOOK FORM ---
    // register: hàm để kết nối các ô input với thư viện 
    // handleSubmit: hàm bao bọc giúp kiểm tra validate trưỚc khi chạy code submit
    // formState: chứa các trạng thái 
  const { register, handleSubmit, formState:{errors, isSubmitting},} = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // sử dụng zod để validate 
    defaultValues:{ // giá trị khởi tạo mặc định cho các trường 
      email: "",
      password: "",
    }
  })
  // --- 4. XỬ LÝ KHI GỬI FORM - dữ liệu đã được valide ---
  const onSubmit = async(data: LoginFormValues) => {
    const {email, password} = data;
    await signIn(email, password);
    navigate("/");
  }
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* handleSubmit : ngăn reload trang khi user bấm submit, 
            lấy toàn bộ dữ liệu từ form, valide bằng zod schema, nếu có lỗi cập nhật errors,
             nếu hợp lệ gọi onsubmit(data) */}
            <FieldGroup>
              {/* thẻ email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id = "email"  
                  type = "email"
                  placeholder="a@gmail.com"
                  // dang ky input
                  {...register("email")}
                  // lưu giá trị input vào form state 
                  // theo dõi thay đổi khi người dùng gõ
                  // gắn name = "email" cho input
                  // kết nối với hệ thống validate
                  className = {cn(
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  // cn() = (clsx + tailwind-merge) sẽ : bỏ giá trị false/ chỉ giữ class string hợp lệ 
                />
                {/*hiển thị lỗi từ đối tượng errors của hook form  */} 
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              {/* thẻ password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                 <Input
                  id = "password"
                  type="password"
                  // đăng ký input
                  {...register("password")}
                  className={cn(
                    errors.password && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.password && (
                  <FieldDescription className="text-red-500">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              {/* thẻ login */}
              <Field>
                <Button type="submit" variant="black" className="w-full" disabled={isSubmitting}>{isSubmitting ? "logging in ..." : "login"}</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to = "/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
