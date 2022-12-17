import { atom } from "jotai"

export const JAppStatus = atom("undefined")
export const JStatusShow = atom(false)
export const JAppReady = atom(false)
export const JRefresh = atom(Math.random())
