import { Form } from 'react-bootstrap'
import { TranslationType } from '../types.d'

interface Props {
  type: TranslationType
  placeholder: string
  loading?: boolean
  onChangeHandler: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px' }

export const TextArea = ({ onChangeHandler, loading, placeholder, value, type }: Props) => {
  const styles = type === TranslationType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#c8c8c8' }

  return (
        <Form.Control
            as='textarea'
            placeholder={placeholder}
            autoFocus={type === TranslationType.From}
            style={styles}
        />
  )
}
