import { useEffect, useState } from "react";
import { LarkBox } from "./index";

export default function LarkGrid() {
  const [larks, setLarks] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://84.201.163.14:8000/larks", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLarks(result);
        console.log(result)
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className="p5">
      <div className="flex flex-row flex-wrap justify-around">
        {/* Array.from(Array(33).keys()) */}
        {larks.map((i) => {
          return <LarkBox id={i.id} text={i.text} date={i.date} author={i.author} />;
        })}
      </div>
    </div>
  );
}
