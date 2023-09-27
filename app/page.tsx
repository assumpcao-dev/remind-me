import { Skeleton } from "@/components/ui/skeleton"
import { wait } from "@/lib/wait"
import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react"

/*
Async function component Home
*/
export default async function Home() {

  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
      <WelcomeMsg />
      </Suspense>
    </>
  )
}

/*
// WelcomeMessage async arrow function
*/
const WelcomeMsg = async () => {
  const user = await currentUser()
  await wait(3000)
  if(!user ) return <div>error</div>

  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName}
      </h1>
    </div>
  )
}

/*
// WelcomeMessageFallback async arrow function
*/
const WelcomeMsgFallback = async () => {
  return <div className="flex w-full">
    <h1 className="text-4xl font-bold">
      <Skeleton className="w-[180px] h-[36px]"/>
      <Skeleton className="w-[150px] h-[36px]"/>
    </h1>
  </div>
}
