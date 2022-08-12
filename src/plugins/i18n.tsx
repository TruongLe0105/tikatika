import I18n from "i18n-js";

import { vi } from "./vi";
import { en } from "./en";

import { LocalStorage } from "@/utils/LocalStorage";
export const LangStorage = "LANG_STORAGE";
import * as Localization from "expo-localization";

export const languages = [
  {
    label: "English (EN)",
    name: "en",
    supported: true,
  },
  {
    label: "Tiếng việt (VI)",
    name: "vi",
    supported: true,
  },
];

export const getLocal = async () => {
  let locale = "en";
  const lang = await LocalStorage.get(LangStorage);
  if (lang) {
    locale = lang;
  } else {
    const local = Localization.locale;
    const lang = languages.find((e) => e.name == local);
    if (lang) {
      locale = lang.name;
    }
  }
  return locale;
};

I18n.locale = "vi";

I18n.fallbacks = true;
I18n.translations = {
  vi,
  en,
};

export { I18n };
