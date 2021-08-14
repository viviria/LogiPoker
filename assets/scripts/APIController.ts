import { Socket } from "cc";

export class APIController {
    private static instace: APIController;
    private _Socket : Socket | null = null;

    private constructor() {
    }

    static GetInstance() {
        if (!APIController.instace) {
            APIController.instace = new APIController();
        }
        return APIController.instace
    }

    public SetSocket(socket : Socket) {
        this._Socket = socket
    }

    CallAPI(APIName: string, ...args: any[]) {
        if (!this._Socket) return

        if (args.length > 0) {
            // 最後の引数をコールバックとする
            const Callback = args[args.length - 1]
            // それ以外をレスポンスパラメータにする
            args = args.slice(0, args.length - 1)
            // リクエストを送信する
            if (args.length > 0) {
                this._Socket.emit('Request' + APIName, ...args)
            } else {
                this._Socket.emit('Request' + APIName)
            }
            // レスポンスのコールバック
            this._Socket.on('Response' + APIName, Callback)
        }
    }
}

export default APIController