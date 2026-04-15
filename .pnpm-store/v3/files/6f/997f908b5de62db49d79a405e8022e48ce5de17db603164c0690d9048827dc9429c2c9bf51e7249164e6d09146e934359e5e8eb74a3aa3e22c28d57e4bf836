type Language = string;
interface LanguageModel {
    [Key: string]: string | LanguageModel;
}
type TFunc = (key: string, vars?: {
    [key: string]: string;
}, fallbackText?: string) => string;
type TI18n = {
    t: TFunc;
    changeLanguage: (config: ChangeLanguageConfig) => void;
    lang: (lang: Language) => {
        t: TFunc;
    };
};
export interface ChangeLanguageConfig {
    locale?: Language;
}
declare class I18n implements TI18n {
    private language;
    private languageMap;
    private format;
    private getMessage;
    init<T extends LanguageModel>(language?: Language, languageMap?: Record<Language, T>): T;
    changeLanguage(config: ChangeLanguageConfig): void;
    t(key: string, vars?: {
        [key: string]: string;
    }, fallbackText?: string): string;
    lang(lang: string): {
        t: (key: string, vars?: {
            [key: string]: string;
        } | undefined, fallbackText?: string) => string;
    };
}
export { I18n };
