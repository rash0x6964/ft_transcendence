import Pen from "@/components/svgs/Pen"
import Input from "@/components/BaseComponents/Input"
import Mail from "@/components/svgs/Mail"
import Person from "@/components/svgs/Person"
import MainButton from "@/components/BaseComponents/MainButton"
import Avatar from "@/components/BaseComponents/Avatar"
import Change from "@/UI/settings/icons/Change"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"
import { ReactElement, use, useState } from "react"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { object, string } from "yup"
import { update } from "@/services/UpdateService"

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState("")
  const [email, setMail] = useState("")
  const [fullname, setFullname] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let userSchema = object({
      username: string().min(3).max(20),
      fullname: string().min(3).max(20),
      email: string().email(),
    })
    if (!username && !email && !fullname) return
    let parsedUser
    try {
      parsedUser = userSchema.validateSync(
        {
          ...(username ? { userName: username } : {}),
          ...(email ? { email } : {}),
          ...(fullname ? { fullName: fullname } : {}),
        },
        { strict: true }
      )
      //   console.log(parsedUser)
    } catch (err) {
      console.log(err)
      return
    }

    try {
      console.log(parsedUser)
      const user = await update(parsedUser)
      console.log(user)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md">
      <HeadTitle>Setting | Profile</HeadTitle>

      <p className="text-base p-5">Profile</p>
      <div className="relative">
        <img
          src="https://otakuusamagazine.com/wp-content/uploads/2020/01/ping-pong-anime-1.jpg"
          alt="W3Schools.com"
          className="w-[680px] h-32  object-cover  mx-auto rounded-xl border-2"
        />
        <Change className="relative -top-3 left-[735px]" />
        <div className=" absolute top-10 left-10">
          <Avatar
            src="https://images.squarespace-cdn.com/content/v1/530f606be4b0340ce5278f2b/1491284690604-I9HSJHJCFVCDTESJO7CS/ke17ZwdGBToddI8pDm48kFTEgwhRQcX9r3XtU0e50sUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcW7uEhC96WQdj-SwE5EpM0lAopPba9ZX3O0oeNTVSRxdHAmtcci_6bmVLoSDQq_pb/image-asset.jpeg"
            alt="W3Schools.com"
            className="w-28 h-28 rounded-full relative border-2"
          />
          <Change className="relative -top-7 left-20" />
        </div>
      </div>
      <form>
        <div className="mt-2">
          <p className="text-base p-5">User Details</p>
          <div className="flex justify-center flex-wrap gap-x-7 gap-y-4">
            <Input
              placeholder="Full name"
              icon={<Pen />}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px] h-11  "
            />
            <Input
              placeholder="Username"
              icon={<Person />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px]  h-11"
            />
            <Input
              placeholder="Mail"
              icon={<Mail />}
              value={email}
              onChange={(e) => setMail(e.target.value)}
              className="w-[332px] min-w-[300px]  bg-big-stone  h-11"
            />
            <div className="w-[332px] min-w-[300px]"></div>
          </div>
          <div className="flex justify-end mt-5">
            <MainButton
              className="w-32 py-3 mb-5 mr-7"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Save
            </MainButton>
          </div>
        </div>
      </form>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SettingLayout>{page}</SettingLayout>
}

export default Page
