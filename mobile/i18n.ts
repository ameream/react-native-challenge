import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "./assets/locales/en.json";
import es from "./assets/locales/es.json";

const translations = { en, es };
const i18n = new I18n(translations);

i18n.locale = Localization.getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

export default i18n;
