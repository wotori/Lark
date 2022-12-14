import { LarkBox } from "./index";

export function LarkGrid() {
  return (
    <div className="p5">
      <div className="flex flex-row flex-wrap justify-around">
        {Array.from(Array(33).keys()).map((i) => {
          return <LarkBox key={i} text={i} />;
        })}
      </div>
    </div>
  );
}
