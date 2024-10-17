import { useI18n } from 'vue-i18n'
import type { LangCode, MessageSchema } from '../locales/i18n'

export function useLang() {
  return useI18n<{ message: MessageSchema }, `${LangCode}`>()
}
