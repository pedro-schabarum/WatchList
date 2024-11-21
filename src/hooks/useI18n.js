import { useEffect } from "react";
import i18n from "./I18n"; // Importa sua configuração do i18n

export function useI18n(idioma) {
  useEffect(() => {
    if (idioma) {
      i18n.locale = idioma; // Atualiza o idioma no i18n
    }
  }, [idioma]); // Dependência no idioma
}
