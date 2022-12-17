import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { JRefresh } from "../jotai";
import { LarkBox } from "./index";

function compare( a, b ) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

export default function LarkGrid() {
  const [larks, setLarks] = useState([]);
  const [refresh, setRefresh] = useAtom(JRefresh)
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
  }, [refresh]);

  return (
    <div className="p5">
      <div className="flex flex-row flex-auto flex-wrap justify-center">
        {/* Array.from(Array(33).keys()) */}
        {larks.slice(0).reverse().map((i) => {
          return <LarkBox key={i.id} id={i.id} text={i.text} date={i.date} author={i.author} />;
        })}
      </div>
    </div>
  );
}
