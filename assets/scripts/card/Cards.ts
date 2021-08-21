import { CardFunctionFactory, CardFunctionType, CardFunctionTypes } from './CardFunctionFactory';

export class NumberCard {
    private _name : string = ""
    private _value : number = 0

    constructor(name: string, value: number) {
        this._name = name
        this._value = value
    }

    get Value() : number {
        return this._value
    }

    get Name() : string {
        return this._name
    }
}

export class FunctionCard {
    private _CardType : CardFunctionType = CardFunctionTypes.None

    constructor(Type: CardFunctionType) {
        this._CardType = Type
    }

    Calculate(A: number, B: number) : number {
        return CardFunctionFactory.CreateCardFunction(this._CardType).execute(A, B)
    }

    get CardType() : CardFunctionType {
        return this._CardType
    }
}
