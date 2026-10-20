/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Suivi Google (voir src/lib/googleTag.ts) : facultatif, rien n'est chargé s'il est absent */
  readonly VITE_GA4_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_LABEL_BOOKING?: string;
  readonly VITE_GOOGLE_ADS_LABEL_FORM?: string;
  readonly VITE_GOOGLE_ADS_LABEL_PHONE?: string;
}
