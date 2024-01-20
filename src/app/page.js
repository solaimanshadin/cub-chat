import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Conversation from "./Conversation";
import { db } from "./firebase";
import UserProfile from "./UserProfile";

export default async function Home({searchParams}) {
  const groupId = searchParams.groupId
  const groupCollectionRef = await collection(db, "groups")
  const getGroups = async () => {
    const data = await getDocs(groupCollectionRef)
    return data?.docs?.map((doc) => ({...doc.data(), id: doc.id}))
  }
  const groups = await getGroups()
  return (
    <div className="grid grid-cols-4 h-screen overflow-auto">
     
      <aside className="bg-white p-4 h-full ">
        <div>
          <UserProfile/>
        </div>
        <ul>
          {groups?.map((group) => <Link key={group.id} href={`?groupId=${group.id}`}>
           <li  className= {group.id === groupId ? 'p-2 rounded-2xl bg-red-50 flex gap-3 mb-4 items-center' : "p-2 flex gap-3 mb-4 items-center"} >
            <Image className="rounded-full" width="60" height="60" src={group.photo} alt={group.name} />
            <p>{group.name}</p>
          </li>
          </Link>
          )}
         
        </ul>
      </aside>
      <main className="col-span-3">
        {groupId &&  <Conversation groupId={groupId} />}
       
      </main>
    
    </div>
  );
}
