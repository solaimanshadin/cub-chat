'use client'
import Image from 'next/image'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
function Page() {
    const router = useRouter()
    const session  =  useSession()
    console.log("session", session)
    if(session.status === "authenticated") {
        router.replace('/')
        return null
    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className='bg-white rounded-xl shadow-md max-w-md p-8 '>
                <div className='text-center'>
                    <div className="flex justify-center">
                        <Image src="/logo.png" width={150} height={70} alt="CUB CHAT" />

                    </div>
                    <div className='my-8'>
                      <h1 className='text-2xl text-gray-800 font-semibold'>Welcome to CUB Chat</h1>
                      <p className='text-sm text-gray-600'>A dedicated Chatting application for CUB students</p>
                    </div>

                    <div className='py-4'>
                        <button onClick={() => signIn("google")}  className='flex shadow-sm items-center rounded-md w-full bg-[#4C83E5] text-white p-[6px]  space-x-2'>
                            <div className='p-3  rounded-md text-2xl bg-white'>
                            <FcGoogle/>
                            </div>
                            
                            <p className='text-xl font-semibold text-center flex-1'>Login with Google</p>

                        </button>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default Page