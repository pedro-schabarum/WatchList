import { I18n } from "i18n-js";
import en from "../locales/en";
import pt_BR from "../locales/pt_BR";

console.log(I18n);

// Definindo as traduções
const i18n = new I18n({
  "en-US": en, // Idioma inglês
  "pt-BR": pt_BR, // Idioma português
});

// Definindo o idioma padrão
i18n.defaultLocale = "pt-BR";

i18n.fallbacks = true;

// i18n.locale = "pt-BR"; // O idioma inicial, pode ser alterado dinamicamente

export default i18n;
