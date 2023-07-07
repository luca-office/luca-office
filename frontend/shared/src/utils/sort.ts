import {PositionedElement, ScoredElement} from "../models"
import {sort} from "./array"

export const sortByPosition = <T extends PositionedElement>(list: T[]): T[] => sort(({position}) => position || 0, list)
export const sortByScore = <T extends ScoredElement>(list: T[]): T[] => sort(({score}) => score || 0, list)
