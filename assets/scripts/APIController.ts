import { Socket } from "cc";

export class APIController {
    private static _instace: APIController;
    private static _Socket : Socket | null = null;

    private constructor() {
    }

    static GetInstance(): APIController {
        if (!APIController._instace) {
            APIController._instace = new APIController();
        }
        return APIController._instace
    }

    static SetSocket(socket : Socket) {
        APIController._Socket = socket
    }

    static GetUserID(): string {
        return localStorage.getItem('LogiPokerUserID') || Math.random().toString(32).substring(2) + Date.now()
    }

    CallAPI(APIName: string, ...args: any[]) {
        if (!APIController._Socket) return

        if (args.length > 0) {
            // 最後の引数をコールバックとする
            const Callback = args[args.length - 1]
            // それ以外をレスポンスパラメータにする
            args = args.slice(0, args.length - 1)
            // リクエストを送信する
            if (args.length > 0) {
                APIController._Socket.emit('Request' + APIName, ...args)
            } else {
                APIController._Socket.emit('Request' + APIName)
            }
            // レスポンスのコールバック
            APIController._Socket.on('Response' + APIName, Callback)
        }
    }
}

export default APIController