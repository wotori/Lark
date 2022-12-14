import { LarkHead } from "./components/header";
import { LarkBox } from "./components/textbox";

export function App() {
  return (
    <>
      <LarkHead />
      <div class="p5">
        <div class="flex flex-row flex-wrap justify-around">
          {Array.from(Array(33).keys()).map((i) => {
            console.log(i);
            return <LarkBox text={i} />;
          })}
        </div>
      </div>
    </>
  );
}
