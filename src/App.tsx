import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack, Overlay, Tooltip } from 'react-bootstrap'
import { AUTO } from './constants'
import { CopyIcon, SpeakerIcon, SwapIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TranslationType } from './types.d'
import { TextArea } from './components/TextArea'
import React, { useEffect, useRef, useState } from 'react'
import { translateApi as translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

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

  const debouncedFromText = useDebounce<string>(fromText, 500)

  const handleClipboardChange = () => {
    navigator.clipboard.writeText(result).catch(() => {})

    setShowTooltip(true)
  }

  const handleTextToSpeechChange = () => {
    const utterance = new SpeechSynthesisUtterance(result)

    utterance.lang = toLanguage
    utterance.rate = 0.8

    speechSynthesis.speak(utterance)
  }

  const [showTooltip, setShowTooltip] = useState(false)
  const target = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 3000)

    return () => { clearTimeout(timer) }
  }, [showTooltip])

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return

        setResult(result)
      })
      .catch(error => { setResult(error) })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
      <Container fluid>
          <h2>Chat GPT Translate</h2>
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
                      />
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
                      <div style={{ position: 'relative' }}>
                          <TextArea
                              type={TranslationType.To}
                              onChangeHandler={setResult}
                              value={result}
                              loading={loading}
                          />

                          <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                              <Button
                                  variant='link'
                                  onClick={handleClipboardChange}
                                  ref={target}
                                  className='clipboard-button'
                              ><CopyIcon></CopyIcon>
                              </Button>

                              <Button
                                  variant='link'
                                  onClick={handleTextToSpeechChange}
                                  className='speaker-button'
                              ><SpeakerIcon></SpeakerIcon>
                              </Button>

                              <Overlay target={target.current} show={showTooltip} placement="right">
                                  {(props) => (
                                      <Tooltip id="overlay-example" {...props}>
                                          Copied!
                                      </Tooltip>
                                  )}
                              </Overlay>
                          </div>
                      </div>
                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
