import { Form } from 'react-bootstrap'
import { TranslationType } from '../types.d'
import { LOADING_TEXT, TEXT_AREA_FROM_PLACEHOLDER, TEXT_AREA_TO_PLACEHOLDER } from '../constants'
import React, { type CSSProperties } from 'react'

interface Props {
  type: TranslationType
  loading?: boolean
  onChangeHandler: (value: string) => void
  value: string
}

interface placeholderProps {
  type: TranslationType
  loading?: boolean
}

const commonStyles: CSSProperties = { border: 0, height: '200px', resize: 'none' }
const commonStylesStyle: CSSProperties = { ...commonStyles, backgroundColor: '#f5f5f5' }

export const TextArea = ({ onChangeHandler, loading, value, type }: Props) => {
  const styles = type === TranslationType.From
    ? commonStyles
    : commonStylesStyle

  const getPlaceholder = ({ type, loading }: placeholderProps) => {
    if (type === TranslationType.From) {
      return TEXT_AREA_FROM_PLACEHOLDER
    }

    if (loading === true) {
      return LOADING_TEXT
    }

    return TEXT_AREA_TO_PLACEHOLDER
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeHandler(event.target.value)
  }

  return (
        <>
            <Form.Control
                as='textarea'
                placeholder={getPlaceholder({ type, loading })}
                autoFocus={type === TranslationType.From}
                style={styles}
                value={value}
                onChange={handleChange}
                disabled={type === TranslationType.To}
            />
        </>
  )
}
