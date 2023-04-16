import { useReducer } from 'react'
import { type Action, ActionType, type FromLanguage, type Language, type State } from '../types.d'
import { AUTO, SUPPORTED_LANGUAGES } from '../constants'
import { defaultFromLanguage, defaultToLanguage } from '../config'

// 1- Create initial state.
const initialState: State = {
  fromLanguage: defaultFromLanguage,
  fromText: '',
  toLanguage: defaultToLanguage,
  toText: SUPPORTED_LANGUAGES.en,
  result: '',
  loading: false
}

// 2- Create reducer.
function reducer (state: State, action: Action) {
  const { type } = action
  const { fromLanguage, toLanguage } = state

  if (type === ActionType.SwapLanguages) {
    if (fromLanguage === toLanguage || fromLanguage === AUTO) {
      return state
    }

    return {
      ...state,
      fromLanguage: toLanguage,
      toLanguage: fromLanguage
    }
  }

  if (type === ActionType.SetFromLanguage) {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === ActionType.SetToLanguage) {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === ActionType.SetFromText) {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === ActionType.SetResult) {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const dispatchers = {
    swapLanguages: () => {
      dispatch({ type: ActionType.SwapLanguages })
    },
    setFromLanguage: (payload: FromLanguage) => {
      dispatch({ type: ActionType.SetFromLanguage, payload })
    },
    setToLanguage: (payload: Language) => {
      dispatch({ type: ActionType.SetToLanguage, payload })
    },
    setFromText: (payload: string) => {
      dispatch({ type: ActionType.SetFromText, payload })
    },
    setToText: (payload: string) => {
      dispatch({ type: ActionType.SetToText, payload })
    },
    setResult: (payload: string) => {
      dispatch({ type: ActionType.SetResult, payload })
    }
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    toText,
    result,
    loading,
    ...dispatchers
  }
}
