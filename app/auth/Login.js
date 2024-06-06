import InputForm from '@/app/auth/InputForm'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <div className="border-b-2 font-bold text-5xl pb-3">LOGIN</div>
      <InputForm method="login"/>
      <br/><br/><br/>
      <p className='py-3 text-xl'> Or Sign Up Here </p>
      <Link href="/multiplayer/SignUp" className='font-bold'> SIGN UP </Link>
    </div>
  )
}
