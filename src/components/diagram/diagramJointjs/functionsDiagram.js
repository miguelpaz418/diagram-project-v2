import Hardware from './hardware/figure';
import Passive from './passive/figure';
import Multimedia from './multimedia/figure';
import Action from './action/figure';
import Attribute from './attribute/figure';
import Interaction from "./interaction/figure";
import Interrelation from "./interrelation/figure"
import Reaction from "./reaction/figure"

function returnFigure (graph,type,zoomOut,zoomIn,continuousLine,dottedLine) {
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
        case "interaction":
            figure = Interaction()
        break;
        case "interrelation":
            figure = Interrelation()
        break;
        case "reaction":
            figure = Reaction()
        break;
        case "out":
            zoomOut()
        break;
        case "in":
            zoomIn()
        break;
        case "dot":
            dottedLine()
        break;
        case "con":
            continuousLine()
        break;
        default:
            console.log("default")
        break;
    }
    if(figure){
        graph.addCells([figure]);
    }
}

function constraintsObjects (fuente,destino,graph,typeDiagram) {
    let res = false
    let message = ""
    const tyFuente = fuente.attributes.class
    const tyDestino = destino.attributes.class
    const parentDestino = destino.getParentCell()
    const parentFuente = fuente.getParentCell()
    

    const outNeigborsFuente = graph.getNeighbors(fuente, { outbound: true })
    const outNeigborsDestino = graph.getNeighbors(destino, { outbound: true })
    const inNeigborsDestino = graph.getNeighbors(destino, { inbound: true })
    const allNeigborsFuente = graph.getNeighbors(fuente)
    const allNeigborsDestino = graph.getNeighbors(destino)

    const titleDestino = destino.attributes.attrs.root.title
    const titleFuente = fuente.attributes.attrs.root.title
    const embeds = fuente.attributes.embeds

    if(tyFuente === 'object' && tyDestino === 'object'){
        res = true
        message = "En este diagrama no se pueden relacionar dos objetos"
    }else if(tyFuente === 'attribute' && tyDestino !== 'object'){
        res = true
        message = "En este diagrama un atributo no se puede relacionar con otras acciones o atributos"
    }else if(tyFuente === 'action' && tyDestino !== 'object'){
        res = true
        message = "En este diagrama una accion no se puede relacionar con otras acciones o atributos"
    }else if( parentDestino !== null  ){
        res = true
        message = "El estereotipo no se puede relacionar porque ya tiene un padre"
    }else if( outNeigborsFuente.length >= 2 && typeDiagram === "3"){
        res = true
        message = "El estereotipo no se puede relacionar porque ya tiene una conexion saliente"
    }else if(tyFuente === 'interrelation' && tyDestino === 'interrelation'){
        res = true
        message = "En este diagrama una accion no se puede relacionar con otras acciones"
    }else if(tyFuente === 'interrelation' && tyDestino === 'object' && parentFuente !== null){
        let name = parentFuente.attributes.attrs.label.text
        if(name === destino.attributes.attrs.label.text && destino.attributes.attrs.label.text !== undefined){
            res = true
            message = "En este diagrama dos objetos iguales no pueden estar relacionados"
        }
    }else if(tyFuente === 'object' && tyDestino === 'interrelation') {
        outNeigborsDestino.forEach(element => {
            if( (element.attributes.attrs.label.text === fuente.attributes.attrs.label.text ) && element.attributes.attrs.label.text !== undefined  && element.attributes.class === 'object'){
                res = true
                message = "En este diagrama dos objetos iguales no pueden estar relacionados"
                return {res,message}
            }
            
        });
    }else if( outNeigborsFuente.length >= 3 && typeDiagram === "2" && tyFuente === 'interrelation'){
        res = true
        message = "El estereotipo alcanzo el limite de conexiones"
    }else if( inNeigborsDestino.length >= 2 && typeDiagram === "2" && tyDestino === 'reaction'){
        res = true
        message = "La reaccion alcanzo el limite de conexiones"
    }else if( inNeigborsDestino.length >= 2 && typeDiagram === "3" ){
        res = true
        message = "El estereotipo no se puede relacionar porque ya tiene una conexion entrante"
    }else if( titleFuente === titleDestino && !titleDestino.includes("Seleccione")){
        res = true
        message = "El diagrama no puede tener dos acciones consecutivas con el mismo valor"
    }else if( (tyFuente === 'object' && allNeigborsFuente.length >= 2 && typeDiagram === "3" ) 
    || (tyDestino === 'object' && allNeigborsDestino.length >= 2 && typeDiagram === "3")){
        res = true
        message = "El diagram debe comenzar y finalizar con un objeto"
    }else if( (tyFuente === 'object' && allNeigborsFuente.length >= 2 && typeDiagram === "2" ) 
    || (tyDestino === 'object' && allNeigborsDestino.length >= 2 && typeDiagram === "2")){
        res = true
        message = "El objeto como maximo debe tener una conexion"
    }else if(tyFuente === 'object' && tyDestino === 'reaction'){
        res = true
        message = "El objeto no se puede relacionar directamente con una reaccion"
    }else if(tyDestino === 'action'){
        const actions = fuente.attributes.actions
        if( actions.includes(titleDestino) && !embeds.includes(destino.id) ){
            res = true
            message = "El objeto ya tiene una accion con ese valor"
        }
    }else if(tyDestino === 'attribute'){
        const attributes = fuente.attributes.attributes
        if( attributes.includes(titleDestino) && !embeds.includes(destino.id) ){
            res = true
            message = "El objeto ya tiene un atributo con ese valor"
        }
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

function unembedElements (parent,graph,destino)  {
    let succesors = graph.getSuccessors(destino)
    parent.unembed(destino)
    succesors.forEach(element => {
        parent.unembed(element)
    });
};

function embedElements (parent,graph,destino)  {
    let succesors = graph.getSuccessors(destino)
    parent.embed(destino)
    succesors.forEach(element => {
        parent.embed(element)
    });
};

function filterValueOfArray (destino, fuente)  {

    if(destino.attributes.class === "action"){
        let actions = fuente.attributes.actions
        let action = destino.attributes.attrs.root.title
        let newActions = actions.filter(function(element){ 
            return element !== action; 
        });
    
        fuente.prop('actions', newActions);
    }else if(destino.attributes.class === "attribute"){
        let attributes = fuente.attributes.attributes
        let attribute = destino.attributes.attrs.root.title
        let newAttributes = attributes.filter(function(element){ 
            return element !== attribute; 
        });
    
        fuente.prop('attributes', newAttributes);
    }
};

function addValueToArray (destino, fuente, title)  {

    if(destino.attributes.class === "action"){
        let actions = fuente.attributes.actions
        actions.push(title)
        fuente.prop('actions', actions);
    }else if(destino.attributes.class === "attribute"){
        let attributes = fuente.attributes.attributes
        attributes.push(title)
        fuente.prop('attributes', attributes);
    }

};

function changeValueToArray (parent, previousTitle, title, typeArray)  {

    let array = []
    switch (typeArray) {
        case "actions":
            array = parent.attributes.actions
        break;
        case "attributes":
            array = parent.attributes.attributes
        break;
        default:
            console.log("default")
            return
    }

    if(!previousTitle.includes("Seleccione")){

        array = array.filter(function(element){ 
            return element !== previousTitle; 
        });
         
    }
    array.push(title)
    parent.prop(typeArray, array);
};

function getObjectsNames (cells, nameObject)  {
    let names = []
    if(cells.length > 0){
        cells.forEach(element => {
            let type = undefinedToEmpty(element.attributes.class)
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
            let type = undefinedToEmpty(element.attributes.class)
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
    allObjectsHaveNames,
    changeValueToArray,
    unembedElements,
    embedElements
};