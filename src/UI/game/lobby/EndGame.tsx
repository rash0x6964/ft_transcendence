import Lobby from "@/models/Lobby.model"
import PlayersScore from "./PlayersScore"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  lobby: Lobby
}

export default function EndGame({ lobby }: Props) {
  return (
    <div className="w-full h-full justify-between flex flex-col py-1">
      <div className="flex justify-between">
        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" mr-auto w-full h-2 bg-primary"></div>
          <div className=" w-[50%] h-2 bg-primary"></div>
          <div className=" w-[25%] h-2 bg-primary"></div>
        </div>

        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" mr-auto w-full h-2 bg-primary"></div>
          <div className="ml-auto  w-[50%] h-2 bg-primary"></div>
          <div className="ml-auto  w-[25%] h-2 bg-primary"></div>
        </div>
      </div>

      <div className="w-full">
        <PlayersScore
          time="2:50"
          className="mb-8 mx-auto"
          player1={lobby.players[0]}
          player2={lobby.players[1]}
        />
        <div className="mx-auto mb-24  text-center">
          {" "}
          <span>Ranked</span>
          <span className="text-primary mx-4">/</span> <span>Normal</span>{" "}
        </div>

        <div className="mx-auto flex gap-36 w-fit ">
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-1s ">
            <div className=" flex gap-4">
              <Avatar
                src="https://steamavatar.io/img/1477684926Qx9fW.png"
                className="w-10 h-10"
              />
              <Avatar
                src="https://steamavatar.io/img/1477684926Qx9fW.png"
                className="w-10 h-10"
              />
              <Avatar
                src="https://steamavatar.io/img/1477684926Qx9fW.png"
                className="w-10 h-10  col-span-2"
              />
            </div>
            <div className="mx-auto text-2xl text-slate-500 font-light">
              Acheivements
            </div>
          </div>
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn  animate__delay-2s">
            <div className="mx-auto text-5xl text-primary">75+</div>
            <div className="mx-auto text-2xl text-slate-500 font-light">
              Coins
            </div>
          </div>
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-3s">
            <div className="mx-auto text-5xl text-primary">250+</div>
            <div className="mx-auto text-2xl text-slate-500 font-light">XP</div>
          </div>
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-s">
            <div className="mx-auto text-5xl text-primary">500+</div>
            <div className="mx-auto text-2xl text-slate-500 font-light">RP</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" w-[25%] h-2 bg-primary"></div>
          <div className=" w-[50%] h-2 bg-primary"></div>
          <div className=" mr-auto w-full h-2 bg-primary"></div>
        </div>

        <div className="w-[40%] gap-2 flex flex-col">
          <div className="ml-auto  w-[25%] h-2 bg-primary"></div>
          <div className="ml-auto  w-[50%] h-2 bg-primary"></div>
          <div className=" mr-auto w-full h-2 bg-primary"></div>
        </div>
      </div>
    </div>
  )
}