interface ImportMetaEnv {
    readonly VITE_REACT_APP_GOOGLE_RECAPTCHA_KEY: string;
    // add other environment variables here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}