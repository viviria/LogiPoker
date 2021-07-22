
import { CardFunctionInterface } from './CardFunctionInterface';

export class CardFunctions {
    public static Error() : CardFunctionInterface {
        return new class implements CardFunctionInterface {
            execute(A: number, B: number) : number {
                console.error("Use Error Function!");
                return Number.NaN;
            }
        }
    }

    public static CreateSum() : CardFunctionInterface {
        return new class implements CardFunctionInterface {
            execute(A: number, B: number) : number {
                return A + B
            }
        }
    }
    
    public static CreateSub() : CardFunctionInterface {
        return new class implements CardFunctionInterface {
            execute(A: number, B: number) : number {
                return A - B
            }
        }
    }
    
    public static CreateMulti() : CardFunctionInterface {
        return new class implements CardFunctionInterface {
            execute(A: number, B: number) : number {
                return A * B
            }
        }
    }

    public static CreateDiv() : CardFunctionInterface {
        return new class implements CardFunctionInterface {
            execute(A: number, B: number) : number {
                return A / B
            }
        }
    }
}
