import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { ALL_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types'
import { defaultModelID } from '../config'

const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY
const apiOrganization = import.meta.env.VITE_OPEN_AI_ORGANIZATION

const configuration = new Configuration({ apiKey, organization: apiOrganization })
const openai = new OpenAIApi(configuration)

type TranslateProps = | {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export async function translate ({ fromLanguage, toLanguage, text }: TranslateProps) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are an AI that translates text. You receive a text from the user. Do not answer, just translate the text.' +
          'The original language is surrounded by `{{` and `}}`. You can also receive {{Detect Language}} which means you have to detect the language' +
          'The language you translate is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Hola mundo {{Español}} [[English]]: ${text}`
      // content: `Hola mundo {{${fromLanguage}}} to [[${toLanguage}]]: ${text}`
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello World'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{Detect Language}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Nu {{Detect Language}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Now'
    }
  ]
  const fromCode = ALL_LANGUAGES[fromLanguage]
  const toCode = ALL_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: defaultModelID,
    messages: [...messages, {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `${text} {{${fromCode}} [[${toCode}]]`
    }]
  })

  return completion.data.choices[0]?.message?.content
}
