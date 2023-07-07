import * as i18next from "i18next"
import * as React from "react"
import {useTranslation, UseTranslationOptions, withTranslation, WithTranslationProps} from "react-i18next"
import {LucaI18nLangKey} from "./luca-i18n-lang"

/**
 * Define own type for t-function to provide some type safety for language keys.
 */
export type LucaTFunction = <TInterpolationMap extends Record<string, unknown> = i18next.StringMap>(
  key: LucaI18nLangKey | LucaI18nLangKey[],
  options?: i18next.TOptions<TInterpolationMap> | string
) => string

export const withLucaTranslation: (
  ns?: i18next.Namespace,
  options?: {
    withRef?: boolean
  }
) => <P extends WithLucaTranslation>(
  component: React.ComponentType<P>
) => React.ComponentType<Omit<P, keyof WithLucaTranslation> & WithTranslationProps> = withTranslation as never

export interface WithLucaTranslation {
  readonly t: LucaTFunction
}

export type UseLucaTranslationResponse = [LucaTFunction, i18next.i18n, boolean] & {
  t: LucaTFunction
  i18n: i18next.i18n
  ready: boolean
}

export const useLucaTranslation = useTranslation as (
  ns?: i18next.Namespace,
  options?: UseTranslationOptions
) => UseLucaTranslationResponse

export const lucaTranslate = (key: LucaI18nLangKey | LucaI18nLangKey[]): string => i18next.default.t(key)
