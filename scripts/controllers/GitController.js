class GhController {
    constructor (){
        this.start()
    }
    async start(){
        let model = new GhModel();
        let view = new GhView();
        await model.request();
        view.makeLayout(model.team)
    }
}