import '../styles/globals.css'
import './reactCOIServiceWorker';
import Tutorial from './tutorial';
import LarkHead from '../components/header/index'
import LarkGrid from '../components/textbox/grid'
import StatusBar from "../components/status_bar"

import { useAtom } from "jotai"
import { JStatusShow } from "../components/jotai/index"

export default function App() {
  const [showAppState] = useAtom(JStatusShow)
  return (
    <>
      {/* <Tutorial /> */}
      {showAppState && <StatusBar />}
      <LarkHead />
      <LarkGrid />
    </>
  )
}