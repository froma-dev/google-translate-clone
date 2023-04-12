import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore } from './hooks/useStore';
import {Container, Row, Col, Button, Form, Stack} from 'react-bootstrap';
import {AUTO_LANGUAGE, TEXT_AREA_FROM_PLACEHOLDER, TEXT_AREA_TO_PLACEHOLDER} from "./constants";
import {SwapIcon} from "./components/icons";
import {LanguageSelector} from "./components/LanguageSelector";
import {TranslationType} from "./types.d";

function App() {
    const { fromLanguage, fromText, setFromLanguage, setToLanguage, swapLanguages, toLanguage } = useStore();

  return (
      <Container fluid>
          <h2>Gooogle Translate</h2>
          <Row>
              <Col>
                  <Stack gap={2}>
                      <LanguageSelector
                          onClick={setFromLanguage}
                          type={TranslationType.From}
                          langId={fromLanguage}
                          title={fromText}
                      />
                      <Form.Control
                          as='textarea'
                          placeholder={TEXT_AREA_FROM_PLACEHOLDER}
                          autoFocus
                          onChange={setFromLanguage}
                      />
                  </Stack>
              </Col>
              <Col xs='auto'>
                  <Button
                      variant="link"
                      disabled={fromLanguage === AUTO_LANGUAGE}
                      onClick={swapLanguages}>
                      <SwapIcon />
                  </Button>
              </Col>
              <Col>
                  <Stack gap={2}>
                      <LanguageSelector onClick={setToLanguage} type={TranslationType.To} langId={toLanguage} />
                      <Form.Control
                          as='textarea'
                          placeholder={TEXT_AREA_TO_PLACEHOLDER}
                          autoFocus
                          onChange={setToLanguage}
                      />
                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
