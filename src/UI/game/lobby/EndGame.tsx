import PlayersScore from "./PlayersScore"
import Avatar from "@/components/BaseComponents/Avatar"
import MainButton from "@/components/BaseComponents/MainButton"
import { timePipe } from "@/pipes/date.pipes"
import EndGameData from "@/types/EndGameData"
import Link from "next/link"

type Props = {
  data: EndGameData
}

export default function EndGame({ data }: Props) {
  const lobby = data.lobby
  console.log(data)

  return (
    <div className="w-full h-full justify-between flex flex-col py-1">
      <div className="flex justify-between">
        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" mr-auto w-full h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className=" w-[50%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className=" w-[25%] h-2 bg-primary animate-none sm:animate-pulse"></div>
        </div>

        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" mr-auto w-full h-2 bg-primary  animate-none sm:animate-pulse"></div>
          <div className="ml-auto  w-[50%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className="ml-auto  w-[25%] h-2 bg-primary animate-none sm:animate-pulse"></div>
        </div>
      </div>

      <div className="w-full ">
        <PlayersScore
          time={timePipe(lobby.gameData.timer)}
          score={lobby.gameData.score}
          className="mb-8 mx-auto animate__animated animate__fadeIn"
          player1={lobby.players[0]}
          player2={lobby.players[1]}
          mana={null}
        />
        <div className="mx-auto mb-24  text-center animate__animated animate__fadeIn">
          <span>{lobby.ranked ? "Ranked" : "Unranked"}</span>
          <span className="text-primary mx-4">/</span> <span>{lobby.mode}</span>
        </div>

        <div className="mx-auto flex gap-8 sm:gap-36 w-fit ">
          {data.achievements.length > 0 &&
            data.achievements.some((ach) => ach != null) && (
              <div
                className={`flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-4s`}
              >
                <div className=" flex gap-4">
                  {data.achievements.map(
                    (achievement) =>
                      achievement && (
                        <div
                          key={achievement.id}
                          className="mx-auto"
                          title={achievement.description}
                        >
                          <Avatar
                            key={achievement.id}
                            src={achievement.imgUrl}
                            alt={achievement.name}
                            className="w-10 h-10 mx-auto bg-transparent"
                          />
                        </div>
                      )
                  )}
                </div>
                <div className="mx-auto text-2xl text-slate-500 font-light">
                  Achievements
                </div>
              </div>
            )}
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn  animate__delay-1s">
            <div className="mx-auto text-2xl sm:text-5xl text-primary">
              +{data.coins}
            </div>
            <div className="mx-auto text-lg sm:text-2xl text-slate-500 font-light">
              Coins
            </div>
          </div>
          <div className="flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-2s">
            <div className="mx-auto text-2xl sm:text-5xl text-primary">
              +{data.xp}
            </div>
            <div className="mx-auto text-lg sm:text-2xl text-slate-500 font-light">
              XP
            </div>
          </div>
          {lobby.ranked && (
            <div className="flex flex-col gap-10 animate__animated animate__fadeIn animate__delay-3s">
              <div className="mx-auto text-2xl sm:text-5xl text-primary">
                {data.rating > 0 ? "+" : ""}
                {data.rating}
              </div>
              <div className="mx-auto text-lg sm:text-2xl text-slate-500 font-light">
                RP
              </div>
            </div>
          )}
        </div>
      </div>

      <Link
        className="items-center text-primary cursor-pointer hover:scale-105 transition-transform text-sm font-light mx-auto"
        href={"/game/lobby"}
      >
        {`<- Back to lobby`}
      </Link>

      <div className="flex justify-between">
        <div className="w-[40%] gap-2 flex flex-col">
          <div className=" w-[25%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className=" w-[50%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className=" mr-auto w-full h-2 bg-primary animate-none sm:animate-pulse"></div>
        </div>

        <div className="w-[40%] gap-2 flex flex-col">
          <div className="ml-auto  w-[25%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className="ml-auto  w-[50%] h-2 bg-primary animate-none sm:animate-pulse"></div>
          <div className=" mr-auto w-full h-2 bg-primary animate-none sm:animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
