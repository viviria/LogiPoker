import { CardFunctionInterface } from './CardFunctionInterface';
import { CardFunctions } from './CardFunctions';
import { when, then } from "switch-ts";

export const CardFunctionTypes = {
    None: "None",
    Sum: "Sum",
    Sub: "Sub",
    Multi: "Multi",
    Div: "Div",
} as const

export type CardFunctionType = typeof CardFunctionTypes[keyof typeof CardFunctionTypes]

export class CardFunctionFactory {
    public static CreateCardFunction(Type: CardFunctionType) : CardFunctionInterface {
        return when(Type)
        .is(v => v === CardFunctionTypes.Sum, then(CardFunctions.CreateSum()))
        .is(v => v === CardFunctionTypes.Sub, then(CardFunctions.CreateSub()))
        .is(v => v === CardFunctionTypes.Multi, then(CardFunctions.CreateMulti()))
        .is(v => v === CardFunctionTypes.Div, then(CardFunctions.CreateDiv()))
        .default(then(CardFunctions.Error()))
    }
}
