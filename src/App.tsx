import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useStore} from './hooks/useStore';
import {Button, Col, Container, Row, Stack} from 'react-bootstrap';
import {AUTO_LANGUAGE, TEXT_AREA_FROM_PLACEHOLDER, TEXT_AREA_TO_PLACEHOLDER} from "./constants";
import {SwapIcon} from "./components/icons";
import {LanguageSelector} from "./components/LanguageSelector";
import {TranslationType} from "./types.d";
import {TextArea} from "./components/TextArea";

function App() {
    const { fromLanguage, fromText, setFromText, setFromLanguage, setToLanguage, swapLanguages, toLanguage, result, setResult } = useStore();

  return (
      <Container fluid>
          <h2>Gooogle Translate</h2>
          <Row>
              <Col>
                  <Stack className="col-md-5 mx-auto" gap={2}>
                      <LanguageSelector
                          onClick={setFromLanguage}
                          type={TranslationType.From}
                          title={fromText}
                      />
                      <TextArea type={TranslationType.From} placeholder={TEXT_AREA_FROM_PLACEHOLDER} onChangeHandler={setFromText} value={fromText}></TextArea>
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
                  <Stack className="col-md-5 mx-auto" gap={2}>
                      <LanguageSelector onClick={setToLanguage} type={TranslationType.To} title={toLanguage} />
                      <TextArea type={TranslationType.To} placeholder={TEXT_AREA_TO_PLACEHOLDER} onChangeHandler={setResult} value={result}></TextArea>
                  </Stack>
              </Col>
          </Row>
      </Container>
  )
}

export default App
