import Input from "@/components/BaseComponents/Input"
import Pen from "../icons/Pen"
import Mail from "../icons/Mail"
import Person from "../icons/Person"
import MainButton from "@/components/BaseComponents/MainButton"

export default function page() {
  return (
    <div className="bg-secondary rounded-xl">
      <p className="text-base p-5">Profile</p>
      <img
        src="https://otakuusamagazine.com/wp-content/uploads/2020/01/ping-pong-anime-1.jpg"
        alt="W3Schools.com"
        className="w-[90%] h-32  object-cover  mx-auto rounded-xl"
      />
      <img
        src="https://images.squarespace-cdn.com/content/v1/530f606be4b0340ce5278f2b/1491284690604-I9HSJHJCFVCDTESJO7CS/ke17ZwdGBToddI8pDm48kFTEgwhRQcX9r3XtU0e50sUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcW7uEhC96WQdj-SwE5EpM0lAopPba9ZX3O0oeNTVSRxdHAmtcci_6bmVLoSDQq_pb/image-asset.jpeg"
        alt="W3Schools.com"
        className="w-28 h-28 rounded-full translate-x-[30px] -translate-y-[60px]"
      />
      <div className="-translate-y-[60px]">
        <p className="text-base p-5">User Details</p>
        <div className="flex justify-center flex-wrap gap-4">
          <Input
            placeholder="Full name"
            icon={<Pen />}
            className="bg-big-stone w-[42%] min-w-[300px]"
          />
          <Input
            placeholder="Username"
            icon={<Person />}
            className="bg-big-stone w-[42%] min-w-[300px] "
          />
          <Input
            placeholder="Mail"
            icon={<Mail />}
            className="bg-big-stone w-[42%] min-w-[300px] "
          />
          <div className="w-[42%] min-w-[300px]"></div>
        </div>
        <div className="flex justify-end mt-7">
          <MainButton className="w-32 py-4 mr-4"> Save</MainButton>
        </div>
      </div>
    </div>
  )
}
