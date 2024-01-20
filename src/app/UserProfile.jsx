'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import { CiLogout } from "react-icons/ci";

function UserProfile() {
  const session = useSession()
  return (
    <div className="flex justify-between p-2 gray-200">
        <div className="flex gap-3">
            <Image width="30" height="30" alt="Me" src={session?.data?.user?.image} />
            <p>{session?.data?.user?.name}</p>
        </div>
        <button><CiLogout/></button>
    </div>
  )
}

export default UserProfile