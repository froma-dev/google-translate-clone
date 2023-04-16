import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { ALL_LANGUAGES, AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language, TranslationType } from '../types.d'

// Las props pueden ser de dos tipos: "from language" o "to language".
type Props =
    | { type: TranslationType.From, onClick: (Language: FromLanguage) => void, selectedLanguage: FromLanguage }
    | { type: TranslationType.To, onClick: (Language: Language) => void, selectedLanguage: Language }

type EventKey = string | null
type Languages = typeof SUPPORTED_LANGUAGES | typeof AUTO_LANGUAGE

export const LanguageSelector = ({ onClick, selectedLanguage, type }: Props) => {
  const handleSelect = (eventKey: EventKey, e: React.SyntheticEvent<unknown>) => {
    onClick(eventKey as Language)
  }

  const DropDownItem = (languages: Languages) => {
    return Object.entries(languages).map(([key, literal]) => {
      return (
                <Dropdown.Item
                    as="button"
                    key={key}
                    eventKey={key}
                >{literal}
                </Dropdown.Item>
      )
    })
  }

  return (
        <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={ALL_LANGUAGES[selectedLanguage]}>
            {type === TranslationType.From && DropDownItem(AUTO_LANGUAGE)}

            {DropDownItem(SUPPORTED_LANGUAGES)}
        </DropdownButton>
  )
}
