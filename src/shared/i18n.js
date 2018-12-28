import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";


i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        de: {
            translations: {
                "expand": "ausklappen",
                "contract": "einklappen",

                "previous_page": "vorherige Seite",
                "next_page": "nächste Seite",

                "convention": "Parteitag",
                "section": "Abschnitt",
                "submitters": "Antragsteller*in",
                "status": "Status",
                "accepted": "Annahme",
                "rejected": "Ablehnng",
                "not_voted": "keine Abstimmung",
                "dismissed": "Erledigung",
                "referred": "Überweisung",

                "disclaimer-text": "Diese Webseite ist kein offizielles Angebot der SPD-Berlin, dient nur zu Testzwecken und erhebt keinen Anspruch auf Richtigkeit oder Vollständigkeit der dargestellten Daten.",

                "search-prompt": "Antragstexte durchsuchen"
            }
        }
    },
    fallbackLng: "de",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
