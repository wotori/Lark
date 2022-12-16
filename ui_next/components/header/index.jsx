import { useState } from "react";
import { JAppReady } from "../jotai";
import { Modal } from "../modal";
import { useAtom } from "jotai"

export default function LarkHead() {
  const [showModal, setShowModal] = useState();
  const [appReady, setAppReady] = useAtom(JAppReady)
  console.log("app ready:", appReady)

  return (
    <>
      <Modal show={showModal} setShow={setShowModal} />
      <div className="px-10 bg-blue flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img className="object-scale-down h-10" src="svg/logo.svg"></img>
          <p className="p-3 text-white cursor-default select-none">LARK</p>
        </div>
        <p
          className={`p-3 text-white 
          ${appReady ? "cursor-pointer" : "cursor-wait"} 
          select-none`}
          data-modal-toggle="defaultModal"
          onClick={() => setShowModal(appReady && true)}
        >
          create
        </p>
        <div className="flex flex-row items-center hidden">
          <img
            className="object-scale-donw h-10 m-3"
            src="svg/magnifying_glass.svg"
          />
          <input
            type="text"
            className="rounded dark:focus:ring-blue-500"
          ></input>
        </div>
        <p className="text-white cursor-pointer">about</p>
      </div>
    </>
  );
}
