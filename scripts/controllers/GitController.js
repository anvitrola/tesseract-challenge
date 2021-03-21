class GhController {
    constructor (){
        this.model = new GhModel();
        this.model.openRequest();
        this.view = new GhView();
        this.view.makeLayout(this.model.team);
        this.filterLogin(this.model.team);
    }
    filterLogin(filter, team){
        
    }
}