import { WebSocketContext } from "@/UI/WebSocketContextWrapper";
import CookiesService from "@/services/CookiesService";
import RepoService from "@/services/RepoService";
import Ball from "@/types/Ball";
import GraviraOrb from "@/types/GraviraOrb";
import Paddle from "@/types/Paddle";
import StunOrb from "@/types/StunOrb";
import { useRef, useEffect, useContext, useState } from "react";

const secondary: string = "#0F1921";
const primary: string = "#9BECE3";
const white: string = "#FFFFFF";
const iris: string = "#5D3FD3";
const yellow: string = "#FEBF10";

type Props = {
  width: number;
  height: number;
  skins: any;
};

export default function Game({ width, height, skins }: Props) {
  const socket = useContext(WebSocketContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundSkin = useRef<HTMLImageElement | null>(null);
  const isBackgroundSkinLoaded = useRef<boolean>(false);
  const paddleColor = useRef<string[]>([primary, primary]);
  const drawHorizontally = (
    context: CanvasRenderingContext2D,
    ball: Ball,
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    orbs: GraviraOrb[],
    stunOrbs: StunOrb[]
  ) => {
    context.fillStyle = primary;
    context.fillRect(context.canvas.width / 2, 0, 2, context.canvas.height);
    leftPaddle.drawHor(context, paddleColor.current[0]);
    rightPaddle.drawHor(context, paddleColor.current[1]);
    ball.drawHor(context, white);
    context.closePath();
    context.beginPath();
    orbs.forEach((orb) => {
      orb.drawHor(context, iris);
    });
    context.closePath();
    context.beginPath();
    stunOrbs.forEach((orb) => {
      orb.drawHor(context, yellow);
    });
  };

  const drawVertically = (
    context: CanvasRenderingContext2D,
    ball: Ball,
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    orbs: GraviraOrb[],
    stunOrbs: StunOrb[]
  ) => {
    context.fillStyle = primary;
    context.fillRect(0, context.canvas.height / 2, context.canvas.width, 2);
    leftPaddle.drawVer(context, paddleColor.current[0]);
    rightPaddle.drawVer(context, paddleColor.current[1]);
    ball.drawVer(context, white);
    context.closePath();
    context.beginPath();
    orbs.forEach((orb) => {
      orb.drawVer(context, iris);
    });
    context.closePath();
    context.beginPath();
    stunOrbs.forEach((orb) => {
      orb.drawVer(context, yellow);
    });
  };

  const draw = (
    ball: Ball,
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    orbs: GraviraOrb[],
    stunOrbs: StunOrb[]
  ) => {
    let canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = secondary;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    if (backgroundSkin.current !== null && isBackgroundSkinLoaded.current)
      context.drawImage(
        backgroundSkin.current,
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
    if (context.canvas.width > context.canvas.height)
      drawHorizontally(context, ball, leftPaddle, rightPaddle, orbs, stunOrbs);
    else drawVertically(context, ball, leftPaddle, rightPaddle, orbs, stunOrbs);
  };

  const keyDownHandler = (ev: any) => {
    if (ev.key == "w" || ev.key == "ArrowUp" || ev.key == "ArrowLeft") {
      socket?.emit("paddleUp", {
        token: CookiesService.getJwtCookie(),
        data: { isUP: true },
      });
    }
    if (ev.key == "s" || ev.key == "ArrowDown" || ev.key == "ArrowRight") {
      socket?.emit("paddleDown", {
        token: CookiesService.getJwtCookie(),
        data: { isDown: true },
      });
    }
    if (ev.key == "1" || ev.key == "2" || ev.key == "3" || ev.key == "4") {
      socket?.emit("numberPressed", {
        data: { numberPressed: ev.key },
      });
    }
  };

  const keyUpHandler = (ev: any) => {
    if (ev.key == "w" || ev.key == "ArrowUp" || ev.key == "ArrowLeft") {
      socket?.emit("paddleUp", {
        token: CookiesService.getJwtCookie(),
        data: { isUP: false },
      });
    }
    if (ev.key == "s" || ev.key == "ArrowDown" || ev.key == "ArrowRight") {
      socket?.emit("paddleDown", {
        token: CookiesService.getJwtCookie(),
        data: { isDown: false },
      });
    }
    if (ev.key == "1" || ev.key == "2" || ev.key == "3" || ev.key == "4") {
      socket?.emit("numberPressed", {
        data: { numberPressed: null },
      });
    }
  };

  useEffect(() => {
    if (!socket) return;
    let handler = (data: any) => {
      draw(
        new Ball(data.ball.x, data.ball.y),
        new Paddle(data.paddle1.x, data.paddle1.y),
        new Paddle(data.paddle2.x, data.paddle2.y),
        data.orbs.map((orb: any) => new GraviraOrb(orb.x, orb.y)),
        data.stunOrbs.map((orb: any) => new StunOrb(orb.x, orb.y))
      );
    };

    const updateSkins = async () => {
      if (!skins) return;

      if (skins[0]?.paddleSkin?.color) {
        paddleColor.current[0] = skins[0].paddleSkin.color;
      }
      if (skins[1]?.paddleSkin?.color) {
        paddleColor.current[1] = skins[1].paddleSkin.color;
      }
      try {
        const skins = await RepoService.getSkins();
        console.log(skins);
        backgroundSkin.current = new Image();
        backgroundSkin.current.src = skins.mapSkin.img;
        backgroundSkin.current.onload = () =>
          (isBackgroundSkinLoaded.current = true);
      } catch (err) {
        console.log(err);
      }
    };

    updateSkins();

    socket?.on("gameData", handler);
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      socket?.off("gameData");
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <canvas
      style={{ imageRendering: "pixelated" }}
      className="w-full h-full focus:outline-none "
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}
