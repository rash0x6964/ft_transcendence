type Props = {
  gameMode: string
}

export default function GameInfoDialBox({ gameMode }: Props) {
  return (
    <div className="gradient-border-2  p-4 rounded-xl">
      <div className="flex relative">
        {gameMode == "Normal" && (
          <div className="p-2">
            <p className="mb-2">
              To play, use the <span className="text-primary">W</span> and{" "}
              <span className="text-primary">S</span> buttons to move the paddle
              up and down
            </p>
            <p>
              Block the <span className="text-primary">ball</span> and try to
              make it reach your {"opponent's"} wall to win!
            </p>
          </div>
        )}
        {gameMode == "Speed Demons" && (
          <div className="p-2">
            <p>
              The rules are the same as the normal gamemode, however the ball is
              <span className="text-primary"> TWICE</span> as fast!
            </p>
          </div>
        )}
        {gameMode == "Magician" && (
          <div className="p-2">
            <p className="mb-2">
              This gamemode contains
              <span className="text-primary"> spells</span>!
            </p>
            <p className="mb-2">
              The spells are explained as follows ={">"} key to press
              <span className="text-primary">: name =</span> explanation
            </p>
            <p className="mb-4">
              <span className="text-primary"> Spells</span>:
            </p>
            <p className="mb-3">
              <span className="text-primary"> 1: Gravira </span> = Spawns a
              gravity orb in front of the ball at the moment of casting. <br />{" "}
              Whenever the ball goes close to it, its direction is slightly
              disrupted.
            </p>
            <p className="mb-3">
              <span className="text-primary"> 2: Haste </span> = Enhance the
              speed of your paddle, making it
              <span className="text-primary"> twice </span> as fast!
            </p>
            <p>
              <span className="text-primary"> 3: Stun Orb </span> = Spawns a
              homing stun orb that goes towards the opponent. <br /> Once the
              orb reaches its target, the target is stunned for a few seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
