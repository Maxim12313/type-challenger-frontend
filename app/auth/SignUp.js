import InputForm from '@/app/auth/InputForm'
import Link from 'next/link'

export default function Login() {

  return (
    <div className="w-full h-full flex flex-row items-center justify-center helper">
      <div className='flex flex-col p-5'>
        <div className="border-b-2 font-bold text-3xl pb-3 text-center">SIGNUP</div>
        <InputForm method="signup"/>
        <p className='text-xl mt-5 text-center'> Or Login Here </p>
        <Link href="/login" className='font-bold text-center'> LOGIN </Link>
      </div>
    </div>
  )
}
