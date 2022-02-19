import React from "react";
import '@testing-library/jest-dom/extend-expect'
import  { undefinedToEmpty, returnFigure, constraintsObjects, 
            unembedElements, embedElements, filterValueOfArray, 
            addValueToArray, changeValueToArray, getObjectsNames,
            allObjectsHaveNames } from './functionsDiagram'
import * as joint from 'jointjs';
import Hardware from './hardware/figure';
import Passive from './passive/figure';
import Action from './action/figure';
import Attribute from './attribute/figure';
import Interaction from "./interaction/figure";
import Interrelation from "./interrelation/figure"
import Reaction from "./reaction/figure"

describe( 'returnFigure()', () => {
    it('should add a hardware object in graph', () => {
        let type = "hardware"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Objeto hardware')
    })

    it('should add a passive object in graph', () => {
        let type = "passive"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Objeto pasivo')
    })

    it('should add a multimedia object in graph', () => {
        let type = "multimedia"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Objeto multimedia')
    })

    it('should add an action in graph', () => {
        let type = "action"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Seleccione una acción')
    })

    it('should add an attribute in graph', () => {
        let type = "attribute"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Seleccione un atributo')
    })

    it('should add an interaction in graph', () => {
        let type = "interaction"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Seleccione una interacción')
    })

    it('should add an interrelation in graph', () => {
        let type = "interrelation"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Seleccione una interrelación')
    })

    it('should add a reaction in graph', () => {
        let type = "reaction"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell().attributes.attrs.root.title).toBe('Reacción')
    })
/**
    it('should out function in graph', () => {
        let type = "out"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell()).toBe(undefined)
    })

    it('should in function in graph', () => {
        let type = "in"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell()).toBe(undefined)
    })

    it('should dot function in graph', () => {
        let type = "dot"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell()).toBe(undefined)
    })

    it('should con function in graph', () => {
        let type = "con"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell()).toBe(undefined)
    })
 
    it('should function in graph', () => {
        let type = "default"
        let graph = new joint.dia.Graph({},{})
        const mockHandler = jest.fn()
        returnFigure (graph,type,mockHandler,mockHandler,mockHandler,mockHandler)
        expect(graph.getFirstCell()).toBe(undefined)
    })
    */
})

describe( 'constraintsObjects()', () => {
    it('should return related message when two objects are connected', () => {
        let fuente = Hardware()
        let destino = Passive()
        let typeDiagram = "1"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama no se pueden relacionar dos objetos")
    })

    it('should return related message when an action is connected to an attribute', () => {
        let fuente = Action()
        let destino = Attribute()
        let typeDiagram = "1"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama una accion no se puede relacionar con otras acciones o atributos")
    })

    it('should return related message when two actions are connected', () => {
        let fuente = Action()
        let destino = Action()
        let typeDiagram = "1"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama una accion no se puede relacionar con otras acciones o atributos")
    })

    it('should return related message when an attribute is connected to an action', () => {
        let fuente = Attribute()
        let destino = Action()
        let typeDiagram = "1"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama un atributo no se puede relacionar con otras acciones o atributos")
    })

    it('should return related message when two attributes are connected', () => {
        let fuente = Attribute()
        let destino = Attribute()
        let typeDiagram = "1"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama un atributo no se puede relacionar con otras acciones o atributos")
    })

    it('should return related message when an attribute has a parent', () => {
        let fuente = Hardware()
        let destino = Attribute()
        let parent = Hardware()
        let graph = new joint.dia.Graph({},{})
        let typeDiagram = "1"
        graph.addCells([fuente, destino,parent]);
        parent.embed(destino)
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El estereotipo no se puede relacionar porque ya tiene un padre")
    })

    it('should return related message when an object has a connection', () => {
        let fuente = Hardware()
        let destino = Interaction()
        let child = Interaction()
        let graph = new joint.dia.Graph({},{})
        let typeDiagram = "3"
        let link = new joint.dia.Link({ source: { id: fuente.id }, target: { id: child.id }  });
        let link2 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, child, link, link2]);
        fuente.embed(child)
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El estereotipo no se puede relacionar porque ya tiene una conexion saliente")
    })

    it('should return related message when two interrelations are connected', () => {
        let fuente = Interrelation()
        let destino = Interrelation()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama una accion no se puede relacionar con otras acciones")
    })

    it('should return related message when two objects with the same name are connected between an interrelation', () => {
        let fuente = Interrelation()
        let destino = Hardware()
        destino.attributes.attrs.label.text = "objeto-1"
        let parent = destino.clone()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        graph.addCells([fuente, destino, parent]);
        parent.embed(fuente)
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama dos objetos iguales no pueden estar relacionados")
    })

    it('should return related message when two objects with the same name are connected between an interrelation', () => {
        let fuente = Hardware()
        let destino = Interrelation()
        fuente.attributes.attrs.label.text = "objeto-2"
        let child = fuente.clone()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: destino.id }, target: { id: child.id }  });
        graph.addCells([fuente, destino, child, link]);
        destino.embed(child)
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("En este diagrama dos objetos iguales no pueden estar relacionados")
    })

    it('should return related message when a interrelation has more than two outconnections', () => {
        let fuente = Interrelation()
        let destino = Reaction()
        let parent = Hardware()
        let child = Reaction()
        let child2 = parent.clone()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: parent.id }, target: { id: fuente.id }  });
        let link2 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: child.id }  });
        let link3 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: child2.id }  });
        let link4 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, parent, child, child2, link, link2, link3, link4]);
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El estereotipo alcanzo el limite de conexiones")
    })

    it('should return related message when a reaction has more than two inconnections', () => {
        let fuente = Interrelation()
        let destino = Reaction()
        let parent = fuente.clone()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        let link2 = new joint.dia.Link({ source: { id: parent.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, parent, link, link2]);
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("La reaccion alcanzo el limite de conexiones")
    })

    it('should return related message when a stereotype has more than one inconnection in diagramtype 3', () => {
        let fuente = Hardware()
        let destino = Interaction()
        let parent = fuente.clone()
        let typeDiagram = "3"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        let link2 = new joint.dia.Link({ source: { id: parent.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, parent, link, link2]);
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El estereotipo no se puede relacionar porque ya tiene una conexion entrante")
    })

    it('should return related message when two interactions have the same value', () => {
        let fuente = Interaction()
        fuente.attributes.attrs.root.title = "desplazar"
        let destino = fuente.clone()
        let typeDiagram = "3"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El diagrama no puede tener dos acciones consecutivas con el mismo valor")
    })

    it('should return related message when an object has more then one connection', () => {
        let destino = Hardware()
        let child = Interaction()
        let child2 = destino.clone()
        let fuente = child.clone()
        let typeDiagram = "3"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: destino.id }, target: { id: child.id }  });
        let link2 = new joint.dia.Link({ source: { id: child.id }, target: { id: child2.id }  });
        let link3 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, child, child2 , link, link2, link3]);
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El diagram debe comenzar y finalizar con un objeto")
    })

    it('should return related message when a stereotype has more then one connection', () => {
        let destino = Hardware()
        let child = Interrelation()
        let child2 = destino.clone()
        let fuente = child.clone()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: destino.id }, target: { id: child.id }  });
        let link2 = new joint.dia.Link({ source: { id: child.id }, target: { id: child2.id }  });
        let link3 = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        graph.addCells([fuente, destino, child, child2 , link, link2, link3]);
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El objeto como maximo debe tener una conexion")
    })

    it('should return related message when a object has connection with a reaction', () => {
        let fuente = Hardware()
        let destino = Reaction()
        let typeDiagram = "2"
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El objeto no se puede relacionar directamente con una reaccion")
    })

    it('should return related message when a object has an action with that value', () => {
        let fuente = Hardware()
        let destino = Action()
        let typeDiagram = "1"
        let title = "agarrar"
        fuente.attributes.actions = [title]
        destino.attributes.attrs.root.title = title
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El objeto ya tiene una accion con ese valor")
    })

    it('should return related message when a object has an attribute with that value', () => {
        let fuente = Hardware()
        let destino = Attribute()
        let typeDiagram = "1"
        let title = "color:rojo"
        fuente.attributes.attributes = [title]
        destino.attributes.attrs.root.title = title
        let graph = new joint.dia.Graph({},{})
        let {res,message} = constraintsObjects(fuente,destino,graph,typeDiagram)
        expect(res).toBe(true)
        expect(message).toBe("El objeto ya tiene un atributo con ese valor")
    })
})

describe( 'unembedElements()', () => {
    it('should unembed all stereotype', () => {
        let fuente = Hardware()
        let destino = Attribute()
        let child = destino.clone()
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        let link2 = new joint.dia.Link({ source: { id: destino.id }, target: { id: child.id }  });
        graph.addCells([fuente, destino, child, link, link2]);
        fuente.embed(destino)
        fuente.embed(child)
        unembedElements(fuente,graph,destino)
    })

})

describe( 'embedElements()', () => {
    it('should embed all stereotype', () => {
        let fuente = Hardware()
        let destino = Attribute()
        let child = destino.clone()
        let graph = new joint.dia.Graph({},{})
        let link = new joint.dia.Link({ source: { id: fuente.id }, target: { id: destino.id }  });
        let link2 = new joint.dia.Link({ source: { id: destino.id }, target: { id: child.id }  });
        graph.addCells([fuente, destino, child, link, link2]);
        fuente.embed(child)
        embedElements(fuente,graph,destino)
    })

})

describe( 'filterValueOfArray()', () => {
    it('should remove an action to array of object actions', () => {
        let fuente = Hardware()
        let destino = Action()
        fuente.attributes.actions = ["lanzar", "levantar"]
        destino.attributes.attrs.root.title = "lanzar"
        filterValueOfArray(destino,fuente)
        expect(fuente.attributes.actions).toEqual([ 'levantar' ])
    })

    it('should remove an attribute to array of object attributes', () => {
        let fuente = Hardware()
        let destino = Attribute()
        fuente.attributes.attributes = ["color", "dimension"]
        destino.attributes.attrs.root.title = "color"
        filterValueOfArray(destino,fuente)
        expect(fuente.attributes.attributes).toEqual(["dimension"])
    })

})

describe( 'addValueToArray()', () => {
    it('should add an action to array of object actions', () => {
        let fuente = Hardware()
        let destino = Action()
        let title = "lanzar"
        fuente.attributes.actions = ["levantar"]
        destino.attributes.attrs.root.title = title
        addValueToArray(destino,fuente,title)
        expect(fuente.attributes.actions).toEqual(["levantar", "lanzar"])
    })

    it('should add an attribute to array of object attributes', () => {
        let fuente = Hardware()
        let destino = Attribute()
        let title = "color"
        fuente.attributes.attributes = ["dimension"]
        destino.attributes.attrs.root.title = title
        addValueToArray(destino,fuente,title)
        expect(fuente.attributes.attributes).toEqual(["dimension", "color"])
    })

})

describe( 'changeValueToArray()', () => {
    it('should change the action of objects array', () => {
        let parent = Hardware()
        let previousTitle = "levantar"
        let title = "presionar"
        parent.attributes.actions = [previousTitle]
        changeValueToArray(parent,previousTitle,title,"actions")
        expect(parent.attributes.actions).toEqual(["presionar"])
    })

    it('should change the action of objects array', () => {
        let parent = Hardware()
        let previousTitle = "dimensiones"
        let title = "color"
        parent.attributes.attributes = [previousTitle]
        changeValueToArray(parent,previousTitle,title,"attributes")
        expect(parent.attributes.attributes).toEqual(["color"])
    })
/** 
    it('should change the action of objects array', () => {
        let parent = Hardware()
        let previousTitle = "dimensiones"
        let title = "color"
        parent.attributes.attributes = [previousTitle]
        changeValueToArray(parent,previousTitle,title,"default")
        expect(parent.attributes.attributes).toEqual(["dimensiones"])
    })

    */
})

describe( 'getObjectsNames()', () => {
    it('should', () => {
        let object1 = Hardware()
        let object2 = Passive()
        let name1 = "objeto-1"
        let name2 = "object-2"
        object1.attributes.attrs.label.text = name1
        object2.attributes.attrs.label.text = name2
        let names = getObjectsNames([object1,object2],name2)
        expect(names).toEqual(["objeto-1"])
    })
})

describe( 'allObjectsHaveNames()', () => {
    it('should', () => {
        let object1 = Hardware()
        let object2 = Passive()
        let name1 = "objeto-1"
        let name2 = "object-2"
        object1.attributes.attrs.label.text = name1
        object2.attributes.attrs.label.text = name2
        let res = allObjectsHaveNames([object1,object2])
        expect(res).toEqual(true)
    })

    it('should', () => {
        let object1 = Hardware()
        let object2 = Passive()
        let name1 = "objeto-1"
        let name2 = ""
        object1.attributes.attrs.label.text = name1
        object2.attributes.attrs.label.text = name2
        let res = allObjectsHaveNames([object1,object2])
        expect(res).toEqual(false)
    })
})

describe( 'undefinedToEmpty()', () => {
    it('should', () => {
        let value = undefined
        let newValue = undefinedToEmpty(value)
        expect(newValue).toBe("")
    })

    it('should', () => {
        let value = "string"
        let newValue = undefinedToEmpty(value)
        expect(newValue).toBe("string")
    })

})