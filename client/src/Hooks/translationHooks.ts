// src/hooks/translationHooks.ts
import i18n from '../services/i18n';

export const useTranslation = () => {
  const translate = (key: string) => i18n.t(key);

  // Добавляем функцию для получения всех переводов
  const getAllTranslations = () => i18n.getResourceBundle(i18n.language, 'translation');

  return { translate, getAllTranslations };
};
