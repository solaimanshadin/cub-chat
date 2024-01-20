'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import { CiLogout } from "react-icons/ci";
import { signOut } from 'next-auth/react'

function UserProfile() {
  const session = useSession()
  return (
    <div className="flex  justify-between p-2 px-4 bg-gray-50">
        <div className="flex gap-3 items-center">
            {session?.data?.user?.image && <Image className='rounded-full' width="34" height="34" alt="Me" src={session?.data?.user?.image} />}
            <div>{session?.data?.user?.name}</div>
        </div>
        <button onClick={() => signOut('google')}><CiLogout/></button>
    </div>
  )
}

export default UserProfile