import Achievements from "./(components)/Achievements"
import MatchHistory from "./(components)/MatchHistory"

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
    <div className="flex">
      <Achievements />
      <MatchHistory />
    </div>
  )
}