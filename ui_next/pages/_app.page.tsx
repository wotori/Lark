import '../styles/globals.css'
import './reactCOIServiceWorker';
import Tutorial from './tutorial';
import LarkHead from '../components/header/index'
import LarkGrid from '../components/textbox/grid'

export default function App() {
  return (
    <>
      {/* <Tutorial /> */}
      <LarkHead />
      <LarkGrid />
    </>
  )
}