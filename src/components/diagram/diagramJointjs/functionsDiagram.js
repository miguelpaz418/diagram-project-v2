import Hardware from './hardware/figure';
import Passive from './passive/figure';
import Multimedia from './multimedia/figure';
import Action from './action/figure';
import Attribute from './attribute/figure';

function returnFigure (graph,type) {
    var figure = null;
    switch (type) {
        case "hardware":
            figure = Hardware()
        break;
        case "passive":
            figure = Passive()
        break;
        case "multimedia":
            figure = Multimedia()
        break;
        case "action":
            figure = Action()
        break;
        case "attribute":
            figure = Attribute()
        break;
        case "out":
            this.zoomOut()
        break;
        case "in":
            this.zoomIn()
        break;
        default:
            console.log("default")
        break;
    }
    if(figure){
        graph.addCells([figure]);
    }
}

function constraintsObjects (fuente,destino) {
    var res = false
    if(fuente === 'object' && destino === 'object'){
        res = true
    }else if(fuente === 'attribute' && destino !== 'object'){
        res = true
    }else if(fuente === 'action' && destino !== 'object'){
        res = true
    }
    return res
};

function undefinedToEmpty (string)  {
    var res = ""
    if(string === undefined ){
        res = ""
    }else{
        res = string
    }
    return res
};


export { returnFigure, constraintsObjects, undefinedToEmpty };