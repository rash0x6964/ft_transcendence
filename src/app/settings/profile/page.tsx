import Input from "@/components/BaseComponents/Input"
import Pen from "../icons/Pen"
import Mail from "../icons/Mail"
import Person from "../icons/Person"
import MainButton from "@/components/BaseComponents/MainButton"
import Change from "../icons/Change"
import Avatar from "@/components/BaseComponents/Avatar"

export default function page() {
  return (
    <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md">
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
          <Change className="relative -top-7 left-20"  />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-base p-5">User Details</p>
        <div className="flex justify-center flex-wrap gap-x-7 gap-y-4">
          <Input
            placeholder="Full name"
            icon={<Pen />}
            className="bg-big-stone w-[332px] min-w-[300px] h-11  "
          />
          <Input
            placeholder="Username"
            icon={<Person />}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />
          <Input
            placeholder="Mail"
            icon={<Mail />}
            className="w-[332px] min-w-[300px]  bg-big-stone  h-11"
          />
          <div className="w-[332px] min-w-[300px]"></div>
        </div>
        <div className="flex justify-end mt-5">
          <MainButton className="w-32 py-3 mb-5 mr-7"> Save</MainButton>
        </div>
      </div>
    </div>
  )
}
