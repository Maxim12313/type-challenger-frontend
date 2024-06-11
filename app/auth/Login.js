import InputForm from '@/app/auth/InputForm'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="w-full h-full flex flex-row justify-center items-center helper">
      <div className='flex flex-col p-5'>
        <div className="border-b-2 font-bold text-3xl pb-3 text-center">LOGIN</div>
        <InputForm method="login"/>
        <p className='text-xl mt-5 text-center'> Or Sign Up Here </p>
        <Link href="/signup" className='font-bold text-center'> SIGN UP </Link>
      </div>
    </div>
  )
}
