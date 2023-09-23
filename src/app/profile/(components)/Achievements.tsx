import Achievement from "./Achievement"

export default function Achievements() {
  const achievements = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "six" },
    { name: "seven" },
    { name: "eight" },
    { name: "nine" },
    { name: "ten" },
    { name: "eleven" },
    { name: "twelve" },
    { name: "thirteen" },
    { name: "fourteen" },
    { name: "fifteen" },
  ]

  return (
    <>
      <div className="bg-secondary rounded-2xl max-w-lg">
        <h2 className="font-semibold p-3">Achievements</h2>
        <div className="flex flex-wrap justify-center">
          {achievements.map((achievement) => (
            <Achievement key={achievement.name} name={achievement.name} />
          ))}
        </div>
      </div>
    </>
  )
}
