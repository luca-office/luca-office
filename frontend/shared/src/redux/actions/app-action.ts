import {DataAction} from "./data-action"
import {ProjectResumptionAction} from "./project-resumption-action"
import {UiAction} from "./ui-action"

export type SharedAppAction = DataAction | UiAction | ProjectResumptionAction
