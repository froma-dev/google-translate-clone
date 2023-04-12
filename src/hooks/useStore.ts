import {useReducer} from "react";
import {type Action, FromLanguage, Language, type State} from '../types.d';
import {AUTO_LANGUAGE, DETECT_LANGUAGE} from "../constants";

// 1- Create initial state.
const initialState: State = {
    fromLanguage: AUTO_LANGUAGE,
    toLanguage: 'en',
    fromText: DETECT_LANGUAGE,
    result: '',
    loading: false
}

// 2- Create reducer.
function reducer (state: State, action: Action) {
    const { type } = action;

    if (type === 'INTERCHANGE_LANGUAGES') {
        if (state.fromLanguage === state.toLanguage || state.fromLanguage === AUTO_LANGUAGE) {
            return state;
        }

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        }
    }

    if (type === 'SET_FROM_LANGUAGE') {
        return {
            ...state,
            fromLanguage: action.payload
        }
    }

    if (type === 'SET_TO_LANGUAGE') {
        return {
            ...state,
            toLanguage: action.payload
        }
    }

    if (type === 'SET_FROM_TEXT') {
        return {
            ...state,
            loading: true,
            fromText: action.payload,
            result: ''
        }
    }

    if (type === 'SET_RESULT') {
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
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState);

    const dispatchers = {
        swapLanguages: () => {
            dispatch({ type: 'INTERCHANGE_LANGUAGES' })
        },
        setFromLanguage: (payload: FromLanguage) => {
            dispatch({ type: 'SET_FROM_LANGUAGE', payload})
        },
        setToLanguage: (payload: Language) => {
            dispatch({ type: 'SET_TO_LANGUAGE', payload });
        },
        setFromText: (payload: string) => {
            dispatch({ type: 'SET_FROM_TEXT', payload });
        },
        setResult: (payload: string) => {
            dispatch({ type: 'SET_RESULT', payload });
        }
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        ...dispatchers
    }
}