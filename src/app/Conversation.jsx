'use client'
import { formatFirebaseTimestamp } from '@/utils'
import { addDoc, collection, getDocs, where, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { db } from './firebase'
const messageCollectionRef = collection(db, "messages")
function Conversation({ groupId }) {
  const session = useSession()
  const scroll = useRef();

  const messageRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [groupInfo, setGroupInfo] = useState({})
 
  useEffect(() => {
    const q = query(
      collection(db, "groups"),
      // where("id", "==", groupId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        if(doc.id == groupId) {
          data.push({ id: doc.id, ...doc.data() });
        }
        
      });
      console.log("data", data)
      setGroupInfo(data[0]);
    });

    return () => unsubscribe(); // Unsubscribe
  }, [groupId])
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("groupId", "==", groupId),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);

    });
    return () => unsubscribe;

  }, [groupId])

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });

  }, [messages])
  const sendMessage = async (e) => {
    e.preventDefault()
    await addDoc(messageCollectionRef, {
      userName: session.data?.user?.name,
      userPhoto: session.data?.user?.image,
      body: messageRef.current.value, groupId, createdAt: serverTimestamp(),
    })
    messageRef.current.value = null
  }
  console.log("message.createdAt", messages?.[0]?.createdAt)
  return (
    <div className='h-screen '>
      <div className='flex gap-3 items-center bg-white border p-2 px-4 mb-5'>
        {groupInfo?.photo &&  <Image className="rounded-full border border-red-500" src={groupInfo?.photo} width="40" height="40" alt="Group" />}
       
        <h6>{groupInfo?.name}</h6>
      </div>
      <div className='w-full max-w-[1200px] m-auto px-5'>
        <div className='h-[calc(100vh-150px)] overflow-auto'>

          <div >

            {messages?.map((message) => <div className='flex items-start gap-2 mb-6' key={message.id}>
              <Image className="rounded-full border border-red-500" src={message?.userPhoto} width="40" height="40" alt="User" />
              <div className="bg-white  shadow-lg py-3 px-6 rounded-3xl rounded-br-none rounded-tl-none">
                <p className='text-red-500'>{message?.userName}</p>
                <p> {message.body}</p>
                <p className="text-[10px] text-right text-gray-600"> {formatFirebaseTimestamp(message?.createdAt)}</p>

              </div>

            </div>)}

            <span ref={scroll}></span>


          </div>
        </div>

        <form className="" onSubmit={sendMessage}>
          <input className="w-full bg-gray-100/2 shadow p-5 rounded-[30px] ring-0 focus:outline-none" ref={messageRef} placeholder='Type here...' />

        </form>
      </div>

    </div>
  )
}

export default Conversation