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

// --- 1. IMPORT CÁC THƯ VIỆN CÔNG CỤ ---
import { z } from "zod" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router"
import { toast } from "sonner"

// --- 2. ĐỊNH NGHĨA SCHEMA CHO ĐĂNG KÝ ---
const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Vui lòng không bỏ sót username"),
  
  displayName: z
    .string()
    .min(1, "Vui lòng không bỏ sót tên hiển thị"),

  email: z
    .string()
    .min(1, "Vui lòng không bỏ sót email")
    .email("Email không đúng định dạng"),

  phone: z
    .string()
    .min(1, "Vui lòng không bỏ sót số điện thoại")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),

  password: z
    .string()
    .min(1, "Vui lòng không bỏ sót mật khẩu"),
})

// Trích xuất Type từ Schema
type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {signUp} = useAuthStore();
  const navigate = useNavigate()

  // --- 3. KHỞI TẠO HOOK FORM ---
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      phone: "",
      password: "",
    },
  })

  // --- 4. XỬ LÝ KHI GỬI FORM ---
  const onSubmit = async (data: SignupFormValues) => {
    const {displayName, username, email, password} = data;

    // gọi backend để dignup
    await signUp(username, password, email, displayName);
    toast.success("Đăng ký tài khoản thành công!", {
        description: "Bạn có thể dùng tài khoản này để đăng nhập ngay bây giờ.",
    })
    navigate("/signin");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Fill in the information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              
              {/* Username */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  placeholder="johndoe"
                  {...register("username")}
                  className={cn(errors.username && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.username && (
                  <FieldDescription className="text-red-500 text-xs">
                    {errors.username.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Display Name */}
              <Field>
                <FieldLabel htmlFor="displayName">Display name</FieldLabel>
                <Input
                  id="displayName"
                  placeholder="John Doe"
                  {...register("displayName")}
                  className={cn(errors.displayName && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.displayName && (
                  <FieldDescription className="text-red-500 text-xs">
                    {errors.displayName.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="a@gmail.com"
                  {...register("email")}
                  className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.email && (
                  <FieldDescription className="text-red-500 text-xs">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  placeholder="0987654321"
                  {...register("phone")}
                  className={cn(errors.phone && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.phone && (
                  <FieldDescription className="text-red-500 text-xs">
                    {errors.phone.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors.password && (
                  <FieldDescription className="text-red-500 text-xs">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button 
                  type="submit" 
                  variant="black" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>

                <FieldDescription className="text-center mt-2">
                  Already have an account? <a href="#" className="underline">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}