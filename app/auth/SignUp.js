import InputForm from '@/app/auth/InputForm'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <div className="border-b-2 font-bold text-5xl pb-3">SIGNUP</div>
      <InputForm method="signup"/>
      <p className='py-3 text-xl'> Or Login Here </p>
      <Link href="/multiplayer" className='font-bold'> LOGIN </Link>
    </div>
  )
}