import Hardware from './hardware/figure';
import Passive from './passive/figure';
import Multimedia from './multimedia/figure';
import Action from './action/figure';
import Attribute from './attribute/figure';

function returnFigure (graph,type,zoomOut,zoomIn) {
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
            zoomOut()
        break;
        case "in":
            zoomIn()
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
    let res = false
    let message = ""
    const tyFuente = fuente.attributes.attrs.root.ty
    const tyDestino = destino.attributes.attrs.root.ty
    const parent = destino.getParentCell()
    const title = destino.attributes.attrs.root.title
    const actions = fuente.attributes.actions
    const attributes = fuente.attributes.attributes
    const embeds = fuente.attributes.embeds

    if(tyFuente === 'object' && tyDestino === 'object'){
        res = true
        message = "En este diagrama no se pueden relacionar dos objectos"
    }else if(tyFuente === 'attribute' && tyDestino !== 'object'){
        res = true
        message = "En este diagrama un atributo no se puede relacionar con otras acciones o atributos"
    }else if(tyFuente === 'action' && tyDestino !== 'object'){
        res = true
        message = "En este diagrama una accion no se puede relacionar con otras acciones o atributos"
    }else if( parent !== null && parent.id !== fuente.id ){
        res = true
        message = "El estereotipo no se puede relacionar porque ya tiene un padre"
    }else if( actions.includes(title) && !embeds.includes(destino.id) ){
        res = true
        message = "El objeto ya tiene una accion con ese valor"
    }else if( attributes.includes(title) && !embeds.includes(destino.id) ){
        res = true
        message = "El objeto ya tiene un atributo con ese valor"
    }


    return {res,message}
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

function filterValueOfArray (destino, fuente)  {

    if(destino.attributes.attrs.root.ty === "action"){
        let actions = fuente.attributes.actions
        let action = destino.attributes.attrs.root.title
        let newActions = actions.filter(function(element){ 
            return element !== action; 
        });
    
        fuente.prop('actions', newActions);
    }else if(destino.attributes.attrs.root.ty === "attribute"){
        let attributes = fuente.attributes.attributes
        let attribute = destino.attributes.attrs.root.title
        let newAttributes = attributes.filter(function(element){ 
            return element !== attribute; 
        });
    
        fuente.prop('attributes', newAttributes);
    }
};

function addValueToArray (destino, fuente, title)  {

    if(destino.attributes.attrs.root.ty === "action"){
        let actions = fuente.attributes.actions
        actions.push(title)
        fuente.prop('actions', actions);
    }else if(destino.attributes.attrs.root.ty === "attribute"){
        let attributes = fuente.attributes.attributes
        attributes.push(title)
        fuente.prop('attributes', attributes);
    }

};

function getObjectsNames (cells, nameObject)  {
    let names = []
    if(cells.length > 0){
        cells.forEach(element => {
            let type = undefinedToEmpty(element.attr(['root', 'ty']))
            if(type === "object" ){
                let name = undefinedToEmpty(element.attr(['label', 'text']))
                if(name !== nameObject && name !== ""){
                    names.push(name.toLowerCase())
                }
                
            }
        });
    }
    return names
}

function allObjectsHaveNames (cells) {
    let res = true
    if(cells.length > 0){
        cells.forEach(element => {
            let type = undefinedToEmpty(element.attr(['root', 'ty']))
            if(type === "object" ){
                var name = undefinedToEmpty(element.attr(['label', 'text']))
                if(name === ""){
                    return res = false
                }
            }
        });
    }
    return res
}




export { returnFigure, 
    constraintsObjects, 
    undefinedToEmpty, 
    filterValueOfArray, 
    addValueToArray, 
    getObjectsNames, 
    allObjectsHaveNames 
};