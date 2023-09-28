import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { prisma } from "@/lib/prisma"
import { wait } from "@/lib/wait"
import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react"
import { SadFace } from "../_components/sad-face"
import { Loader } from "../_components/loader"

/*
Async function component Home
*/
export default async function Home() {

  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
      <WelcomeMsg />
      </Suspense>
      <Suspense fallback={
      <div className="flex items-start w-full justify-start"> 
        <Loader />
            Loading collections...
        </div>}>
      <CollectionList />

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
    <div className="flex w-full mb-12">
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
  return (
  <div className="flex w-full mb-12">
    <h1 className="text-4xl font-bold">
      <Skeleton className="w-[180px] h-[36px]"/>
      <Skeleton className="w-[150px] h-[36px]"/>
    </h1>
  </div>
  )
}

/*
Arrow function Collection
Get the current User logged
Validate if the user has one collection created.
If the validation passed it will show the collection, if the user don't have
Will return the Alert Message
*/
const CollectionList = async () => {
  const user = await currentUser()
  await wait(3000)
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id
    }
  })

  if(collections.length === 0) {
    return (
    <Alert>
      <SadFace />
      <AlertTitle>There are no collection yet.</AlertTitle>
      <AlertDescription>Create a collection to get started</AlertDescription>
    </Alert>
    )
  }
}