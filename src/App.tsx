import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO } from './constants'
import { SwapIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TranslationType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App () {
  const {
    fromLanguage,
    fromText,
    loading,
    setFromText,
    setFromLanguage,
    setToLanguage,
    swapLanguages,
    toLanguage,
    result,
    setResult
  } = useStore()

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        if (result == null) return

        setResult(result)
      })
      .catch(error => { setResult(error) })
  }, [fromText, fromLanguage, toLanguage])

  return (
      <Container fluid>
          <h2>Gooogle Translate</h2>
          <Row>
              <Col>
                  <Stack className="mx-auto" gap={2}>
                      <LanguageSelector
                          onClick={setFromLanguage}
                          type={TranslationType.From}
                          selectedLanguage={fromLanguage}
                      />
                      <TextArea
                          type={TranslationType.From}
                          onChangeHandler={setFromText}
                          value={fromText}
                          loading={loading} />
                  </Stack>
              </Col>
              <Col xs='auto'>
                  <Button
                      variant="link"
                      disabled={fromLanguage === AUTO}
                      onClick={swapLanguages}
                  >
                      <SwapIcon />
                  </Button>
              </Col>
              <Col>
                  <Stack className="mx-auto" gap={2}>
                      <LanguageSelector
                          onClick={setToLanguage}
                          type={TranslationType.To}
                          selectedLanguage={toLanguage}
                      />
                      <TextArea
                          type={TranslationType.To}
                          onChangeHandler={setResult}
                          value={result}
                      />
                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
