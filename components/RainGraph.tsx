import React, { useEffect } from "react";
import { Weather } from "../Types";
import useTime from "../hooks/useTime";

function RainGraph({ data: { minutely } }: { data: Weather }) {
  const firstMinute = minutely[0].dt;
  const lastMinute = minutely[minutely.length - 1].dt;

  const startOfHour = useTime(firstMinute);
  const endOfHour = useTime(lastMinute);

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = 400);
    const origin = (canvas.height = 200);

    const graphMinute = width / 60;
    let graphTime = 0;

    ctx?.beginPath();
    ctx!.strokeStyle = "hsl(200,100%,75%)";
    ctx!.fillStyle = "hsla(200,100%,75%,0.25)";
    ctx!.lineWidth = 2.5;
    ctx?.moveTo(0, origin);
    minutely?.forEach((minute, i) => {
      ctx?.lineTo(graphTime, origin - minute.precipitation);
      if (i === minutely.length - 1) return;
      graphTime += graphMinute;
    });
    ctx?.lineTo(graphTime, origin);
    ctx?.closePath();
    ctx?.fill();
    ctx?.stroke();
  }, []);

  return (
    <div className="w-10/12 mx-auto my-2">
      <h1 className="text-sm text-start font-bold">Precipitation</h1>
      <p className="text-xs text-start">
        {startOfHour} - {endOfHour}
      </p>
      <canvas
        id="canvas"
        className="w-full bg-gradient-to-tr from-cyan-900/10 to-cyan-900/30"
      ></canvas>
    </div>
  );
}

export default RainGraph;
