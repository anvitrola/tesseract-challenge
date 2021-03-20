class GhController {
    constructor (){
        this.model = new GhModel();
        this.model.openRequest();
        this.view = new GhView(model);
    }
}