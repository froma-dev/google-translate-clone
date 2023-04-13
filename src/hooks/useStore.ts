import {useReducer} from "react";
import {type Action, ActionType, FromLanguage, Language, type State} from '../types.d';
import {AUTO_LANGUAGE, DETECT_LANGUAGE} from "../constants";

// 1- Create initial state.
const initialState: State = {
    fromLanguage: AUTO_LANGUAGE,
    toLanguage: 'en',
    fromText: DETECT_LANGUAGE,
    toText: '',
    result: '',
    loading: false
}

// 2- Create reducer.
function reducer (state: State, action: Action) {
    const { type } = action;

    if (type === ActionType.SwapLanguages) {
        if (state.fromLanguage === state.toLanguage || state.fromLanguage === AUTO_LANGUAGE) {
            return state;
        }

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
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

    return state;
}

export function useStore() {
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        toText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState);

    const dispatchers = {
        swapLanguages: () => {
            dispatch({ type: ActionType.SwapLanguages })
        },
        setFromLanguage: (payload: FromLanguage) => {
            dispatch({ type: ActionType.SetFromLanguage, payload})
        },
        setToLanguage: (payload: Language) => {
            dispatch({ type: ActionType.SetToLanguage, payload });
        },
        setFromText: (payload: string) => {
            dispatch({ type:ActionType.SetFromText, payload });
        },
        setToText: (payload: string) => {
            dispatch({ type: ActionType.SetToText, payload });
        },
        setResult: (payload: string) => {
            dispatch({ type: ActionType.SetResult, payload });
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