import {SurveyEventFragment} from "../../graphql/generated/SurveyEventFragment"

export interface SurveyEvent<TData = Record<string, unknown>> extends Omit<SurveyEventFragment, "timestamp" | "data"> {
  readonly timestamp: Date
  readonly data: TData | null
}
