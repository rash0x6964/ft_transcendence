import Achievements from "./(components)/Achievements"
import MatchHistory from "./(components)/MatchHistory"
import PlayerInfoBar from "./(components)/PlayerInfoBar"

// <div>
{
  /* <img
  className="blur-sm object-cover w-full"
  src="https://www.mobafire.com/images/champion/skins/landscape/yasuo-sea-dog-762x.jpg"
  alt="backdrop"
/> */
}
//   <img
//     className="h-1/6 w-1/6"
//     src="https://pxbar.com/wp-content/uploads/2023/09/anime-profile-pictures.jpg"
//     alt="profile picture"
//   />
//   profile
// </div>

export default function page() {
  return (
    <>
      <div className="relative">
        <div className="m-10">
          <img
            className="rounded-[40px] w-[200%] h-72 -z-10 blur-[3px] object-cover"
            src="https://www.mobafire.com/images/champion/skins/landscape/yasuo-sea-dog-762x.jpg"
            alt="backdrop"
          />
        </div>
        <PlayerInfoBar />
      </div>
      <div className="flex">
        <Achievements />
        <MatchHistory />
      </div>
    </>
  )
}
