import { useEffect, useState } from "react";
import '../../pages/reactCOIServiceWorker';
import { useAtom } from "jotai"
import ZkappWorkerClient from '../../pages/zkappWorkerClient';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'
import { JAppReady, JAppStatus, JRefresh, JStatusShow } from "../jotai";
let transactionFee = 0.1;

export function Modal(props: any) {
  let { show, setShow } = props;
  const [count, setCount] = useState(0);
  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });
  const [appStatus, setAppStatus] = useAtom(JAppStatus)
  const [appStateShow, setAppStateShow] = useAtom(JStatusShow)
  const [appReady, setAppReady] = useAtom(JAppReady)
  const [text, setText] = useState("")
  const [userAccount, setUserAccount] = useState("")
  const [refresh, setRefresh] = useAtom(JRefresh)

  let limit = 100;

  function reset() {
    setCount(0);
    setShow(false);
  }

  useEffect(() => {
    (async () => {
      if (!state.hasBeenSetup) {
        setAppStateShow(true)
        const zkappWorkerClient = new ZkappWorkerClient();

        let msg = 'Loading SnarkyJS'
        console.log(msg);
        setAppStatus(msg)

        await zkappWorkerClient.loadSnarkyJS();
        msg = "done"
        console.log(msg);
        setAppStatus(msg)

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          setState({ ...state, hasWallet: false });
          return;
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);
        console.log("got accounts:", publicKeyBase58, publicKey)
        setUserAccount(publicKeyBase58)

        msg = 'using key'
        setAppStatus(msg)
        console.log(msg, publicKey.toBase58());

        msg = 'checking if account exists'
        setAppStatus(msg)
        console.log(msg);
        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        msg = 'compiling zkApp'
        setAppStatus(msg)
        console.log(msg);
        await zkappWorkerClient.compileContract();
        msg = 'zkApp compiled'
        setAppStatus(msg)
        console.log(msg);

        const zkappPublicKey = PublicKey.fromBase58('B62qordF2MsP4tYWZojMn5f3FYbESpsKS6pLSqqPRe1U8i5ZaZrBron');

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());
        setAppStateShow(false)
        setAppReady(true)


        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
          // currentNum
        });
      }
    })();
  }, []);

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
    let msg = 'sending a transaction'
    setAppStatus(msg)
    setAppStateShow(true)
    console.log(msg);

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    msg = 'creating proof'
    setAppStatus(msg)
    console.log(msg);
    await state.zkappWorkerClient!.proveUpdateTransaction();

    msg = 'getting Transaction JSON'
    setAppStatus(msg)
    console.log(msg);
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    msg = 'requesting send transaction'
    setAppStatus(msg)
    console.log(msg);
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );
    saveDataToDB()
    reset()
    setState({ ...state, creatingTransaction: false });
  }

  function saveDataToDB() {
    setAppStatus("Publishing")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var d = new Date();
    var n = d.toLocaleDateString();
    var t = d.toLocaleTimeString();
    var raw = JSON.stringify({
      "author": userAccount,
      "text": text,
      "date": n + " " + t
    });
    console.log("store to db", raw)

    fetch("https://lark.herokuapp.com/larks", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setRefresh(Math.random())
      })
      .catch(error => console.log('error', error));
    setAppStateShow(false)
  }

  return (
    <>
      {show ? (
        <>
          <div 
            className="xyz justify-center items-center 
            flex overflow-x-hidden overflow-y-auto 
            fixed inset-0 z-10 outline-none focus:outline-none"
            onClick={(e) => {
              console.log(typeof(e))
              let target = e.target as HTMLButtonElement
              let check = target.className.slice(0, 3);
              if (check == "xyz") {
                reset();
              }
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Create Lark</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <textarea
                    rows={5}
                    maxLength={limit}
                    className="focus:outline-none"
                    placeholder="Write your lark blog message"
                    onChange={(e) => {
                      setText(e.target.value);
                      setCount(e.target.value.length);
                    }}
                  ></textarea>
                </div>
                <div className="text-center py-3">
                  {count}/{limit}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => reset()}
                  >
                    Close
                  </button>
                  <button
                    className={`text-white font-bold uppercase 
                    text-sm px-6 py-3 rounded shadow 
                    ${text && !appStateShow ? "bg-blue" : text && appStateShow ? "bg-gray-300 cursor-wait" : !text && "bg-gray-300 cursor-not-allowed"} 
                    hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      console.log("minting", text)
                      if (text && !appStateShow) onSendTransaction()
                      // reset()
                    }}
                  >
                    publish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 bg-blue"></div>
        </>
      ) : null}
    </>
  );
}
