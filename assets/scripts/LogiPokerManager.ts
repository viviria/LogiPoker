
import { _decorator, Component, JsonAsset, SpriteAtlas, randomRangeInt, Prefab, Node, instantiate, Sprite, Socket } from 'cc';
import { NumberCard, FunctionCard } from './card/Cards';
import GameManager from './GameManager';
import { LoginPopup } from './ui/LoginPopup';
import { Popup } from './ui/Popup';
const { ccclass, property } = _decorator;

const Shuffle = <T>(shuffle_array: Array<T>) => {
    for (let i = 0; i < shuffle_array.length; i++) {
        const randIndex = randomRangeInt(i, shuffle_array.length)
        const temp = shuffle_array[i]
        shuffle_array[i] = shuffle_array[randIndex]
        shuffle_array[randIndex] = temp
    }
};

@ccclass('LogiPokerManager')
export class LogiPokerManager extends Component {
    @property
    CanvasNode : Node = new Node()

    @property
    CardSpriteAtlas : SpriteAtlas = new SpriteAtlas()

    @property
    NumberCardJson : JsonAsset = new JsonAsset()

    @property
    FunctionCardJson : JsonAsset = new JsonAsset()

    @property
    NumberCardPrefab : Prefab = new Prefab()

    @property
    LoginPopup : Node = new Node()

    private _NumberCards : NumberCard[] = []
    private _FunctionCards : FunctionCard[] = []

    private _GameManager : GameManager | null = null
    
    Login() {
        this.LoginPopup.active = true
        const LoginPopupComponent = this.LoginPopup.getComponent(Popup)
        LoginPopupComponent?.Open()
        LoginPopupComponent?.SetCloseCallback(() => {
            this.LoginPopup.active = false
        })
        const LoginComponent = this.LoginPopup.getComponent(LoginPopup)
        LoginComponent?.OnClicked((name: string) => {
            console.log(name)
            LoginPopupComponent?.Close()
            this._GameManager?.UserLogin()
        })
    }

    start () {
        this._GameManager = GameManager.GetInstance()

        if (!this._GameManager.IsUserLogin) {
            this.Login()
        }

        // 数字カード生成
        const NumberCardDataList : object = this.NumberCardJson.json.NumberCards
        NumberCardDataList.forEach(NumberCardData => {
            for (let i = 0; i < NumberCardData.count; i++) {
                this._NumberCards.push(new NumberCard(NumberCardData.name, NumberCardData.value))
            }
        });
        // 関数カード生成
        const FunctionCardDataList : object = this.FunctionCardJson.json.FunctionCards
        FunctionCardDataList.forEach(FunctionCardData => {
            for (let i = 0; i < FunctionCardData.count; i++) {
                this._FunctionCards.push(new FunctionCard(FunctionCardData.type))
            }
        });

        Shuffle(this._NumberCards)
        Shuffle(this._FunctionCards)

        /*
        const nc = instantiate(this.NumberCardPrefab)
        nc.getComponent(Sprite)!.spriteFrame = this.CardSpriteAtlas.getSpriteFrame(this._NumberCards[0].Name)
        this.CanvasNode.addChild(nc)
        */
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

