import { currentUser } from "@clerk/nextjs"

export default async function Home() {
  const user = await currentUser()

  if(!user ) return <div>error</div>

  return (
    <div>
      Welcome,  <br /> {user.firstName}
      </div>
  )
}