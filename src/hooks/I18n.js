import { I18n } from "i18n-js";
import en_US from "../locales/en_US";
import pt_BR from "../locales/pt_BR";
import es_ES from "../locales/es_ES";
import de_DE from "../locales/de_DE";
import fr_FR from "../locales/fr_FR";
import ko_KR from "../locales/ko_KR";
import * as Localization from "expo-localization"; // Importando do expo-localization

// Definindo as traduções
const i18n = new I18n({
  "de-DE": de_DE,
  "en-US": en_US,
  "es-ES": es_ES,
  "fr-FR": fr_FR,
  "ko-KR": ko_KR,
  "pt-BR": pt_BR,
});

// Detectando o idioma local do dispositivo
const deviceLanguage = Localization.locale || "en-US"; // Obtendo o idioma local com Expo

// Configurando o idioma do i18n
i18n.locale = deviceLanguage;

// Definindo o idioma padrão
// i18n.defaultLocale = "pt-BR";

// Ativando os fallbacks
i18n.fallbacks = true;

export default i18n;
