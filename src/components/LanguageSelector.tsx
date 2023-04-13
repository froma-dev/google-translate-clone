import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {AUTO_LANGUAGE, DETECT_LANGUAGE, SUPPORTED_LANGUAGES} from "../constants";
import React from 'react';
import {type FromLanguage, type Language, TranslationType} from '../types.d';
import {Stack} from "react-bootstrap";

// Las props pueden ser de dos tipos: "from language" o "to language".
type Props =
    | { type: TranslationType.From, title: string, onClick: (Language: FromLanguage) => void }
    | { type: TranslationType.To, title: string, onClick: (Language: Language) => void }

type EventKey = string | null;

export const LanguageSelector = ({ onClick, title, type }: Props) => {

    const handleSelect = (eventKey: EventKey, e: React.SyntheticEvent<unknown>) => {
        console.log('handleSelect');
        onClick(eventKey as Language);
    }

    return (
        <Stack direction="horizontal">
        <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={title}>
            {type === TranslationType.From && <Dropdown.Item eventKey={AUTO_LANGUAGE}>{DETECT_LANGUAGE}</Dropdown.Item>}

            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => {
                    return (
                        <Dropdown.Item
                            as="button"
                            key={key}
                            eventKey={key}
                        >{literal}
                        </Dropdown.Item>
                    );
                })
            }
        </DropdownButton>
        </Stack>
    );

    // return (
    //     <Form.Select aria-label='Selecciona el idioma'>
    //         {
    //             Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
    //                 <option key={key} value={key}>{literal}</option>
    //             ))
    //         }
    //     </Form.Select>
    // );
}