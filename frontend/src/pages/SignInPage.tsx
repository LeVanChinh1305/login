import { LoginForm } from '@/components/auth/signin-form'
import React from 'react'

const SignInPage = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(
              circle farthest-corner at 10% 20%,
              rgba(176,229,208,1) 42%,
              rgba(92,202,238,0.41) 93.6%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

    </div>
  )
}

export default SignInPage