import Achievement from "./Achievement"

export default function Achievements() {
  const achievements = [
    {
      name: "one",
    },
    {
      name: "two",
    },
    {
      name: "three",
    },
    {
      name: "four",
    },
  ]
  return (
    <>
      <div className="bg-secondary">
        <h2 className="font-semibold p-3">Achievements</h2>
        <div className="flex">
          {achievements.map((achievement) => {
            return (
              <Achievement key={achievement.name} name={achievement.name} />
            )
          })}
        </div>
      </div>
    </>
  )
}
