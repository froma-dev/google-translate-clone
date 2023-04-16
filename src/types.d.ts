import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = keyof typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  toText: string
  result: string
  loading: boolean
}

export enum ActionType {
  SetFromLanguage = 'SET_FROM_LANGUAGE',
  SetToLanguage = 'SET_TO_LANGUAGE',
  SetFromText = 'SET_FROM_TEXT',
  SetToText = 'SET_TO_TEXT',
  SetResult = 'SET_RESULT',
  SwapLanguages = 'SWAP_LANGUAGES'
}

export type Action =
   | { type: ActionType.SetFromLanguage, payload: FromLanguage }
   | { type: ActionType.SwapLanguages }
   | { type: ActionType.SetToLanguage, payload: Language }
   | { type: ActionType.SetFromText, payload: string }
   | { type: ActionType.SetToText, payload: string }
   | { type: ActionType.SetResult, payload: string }

export enum TranslationType {
  From = 'from',
  To = 'to'
}
