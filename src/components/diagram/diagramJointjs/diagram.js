import React from 'react';
import ReactDOM from 'react-dom';
import * as joint from 'jointjs';
//import { connect } from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Panel
import Panel from './panel'

import { returnFigure, 
        constraintsObjects, 
        undefinedToEmpty,
        filterValueOfArray,
        addValueToArray,
        getObjectsNames, 
        allObjectsHaveNames,
        unembedElements,
        embedElements
    } from './functionsDiagram'

import MessageDialog from './messageDialog';


import {
    Prompt
} from "react-router-dom";


// Css files
import "jointjs/dist/joint.css";
import "jointjs/css/layout.css";
import "jointjs/css/themes/default.css";

const styles = theme => ({
    ...theme.formTheme,
    root: {
        '& > *': {
            margin: theme.spacing(1),
        }
    },
  });

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.namespace = joint.shapes; 
        this.graph = new joint.dia.Graph({},{ cellNamespace: this.namespace })
        this.type = this.props.type
        this.state = {
            op5: false,
            selected: {},
            parentsActions: [],
            removed: [],
            handleClick: null
        };

        var CustomLink = joint.shapes.standard.Link.define('standard.Link', {
        });

        this.linkDefau = new CustomLink({
        });
    }


    componentDidMount() {

        if(typeof this.props.data === 'object' && !Array.isArray(this.props.data)){
            this.graph.fromJSON(this.props.data, this.namespace);
            this.zoomLevel = this.props.data.zoomLevel
        }else{
            this.zoomLevel = 1;
        }
        
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 900,
            height: 500,
            model: this.graph,
            cellViewNamespace: this.namespace,
            perpendicularLinks: false,
            linkPinning: true,
            defaultLink: this.linkDefau,
            gridSize: 20,
            drawGrid: {
                name: 'mesh',
                args: { color: '#D6D6D6' }
            },
            background: {
                color: '#EEEEEE'
            },     
            defaultConnectionPoint: { name: 'boundary' },
            linkView: joint.dia.LinkView.extend({
                contextmenu: function(evt, x, y) {
                    if (this.model.get('customLinkInteractions')) {
                        this.addLabel(x, y, { absoluteDistance: true, reverseDistance: true });
                    }
                },
                // custom options:
                options: joint.util.defaults({
                    doubleLinkTools: true,
                }, joint.dia.LinkView.prototype.options)
            })
        });

        if(!this.type){    
            this.paper.setInteractivity(false);
        }else{
            this.paper.setInteractivity(true);
            this.interactivity()
        }

        this.zoomScale()

        /** 
        When a link is connected this function add the value of the action or attribute in the object
        two objects can't be joined
        */
        this.paper.on('link:connect', function(linkView, evt, targetView, connectedToView, magnetElement) {

            const fuente = linkView.sourceView.model
            const destino = linkView.targetView.model
            const { res, message} = constraintsObjects(fuente,destino,this.graph, this.props.typeDiagram)
            let title = destino.attributes.attrs.root.title

            if(res){
                linkView.model.remove()
                this.props.handleOpen(message,"information")
            }else{
                if(fuente.attributes.class === 'object'){
                    embedElements(fuente, this.graph, destino)
                    fuente.embed(linkView.model)
                }else{
                    let parent = fuente.getParentCell()
                    if(parent !== null){
                        embedElements(parent, this.graph, destino)
                        parent.embed(linkView.model)
                    }

                }
                
                if(!title.includes("Seleccione")){
                    addValueToArray(destino, fuente, title)                    
                }
            }

        }.bind(this));

        /** 
        When a link is disconnected this function remove the value of the action or attribute in the object
        */

        this.paper.on('link:disconnect', function(linkView, evt, targetView, connectedToView, magnetElement) {
            if(linkView.sourceView !== null){
                const fuente = linkView.sourceView.model
                const destino = targetView.model
                let parent = destino.getParentCell()
                                
                if(parent !== null){
                    unembedElements(parent, fuente.graph, destino)
                }else{
                    //para diagrama tipo 1
                    fuente.unembed(destino)
                }
    
                filterValueOfArray(destino, fuente)
            }
            

        });


        /** 
        Function for showing the related modal to the esterotipo
        Event when double click
        */

        this.paper.on('element:pointerdblclick', function(elementView, evt) {

            var element = elementView.model;
            var nameObject = undefinedToEmpty(element.attr(['label', 'text']))
            let parent = []
            this.changeShape({}, [])

            if(this.type){
                switch (element.attributes.class) {
                    case "action":
                        let actions = []
                        parent = element.getParentCell()
                        if(parent !== null){
                            actions = parent.attributes.actions
                        }
                        this.changeShape(element, actions)
                        this.props.handleOpen("","action")
                      break;
                    case "attribute":
                        let attributes = []
                        parent = element.getParentCell()
                        if(parent !== null){
                            attributes = parent.attributes.attributes
                            let previousTitle = element.attributes.attrs.root.title
                            if(!previousTitle.includes("Seleccione")){
                                attributes = attributes.filter(function(ele){ 
                                    return ele !== previousTitle; 
                                });
                                 
                            }
                        }
                        this.changeShape(element, attributes)
                        this.props.handleOpen("","attribute")
                      break;
                    case "interaction":
                        let interactions = []
    
                        const allNeigbors = this.graph.getNeighbors(element)
    
                        allNeigbors.forEach(element => {
                            if(element.attributes.class === "interaction"){
                                interactions.push(element.attributes.attrs.root.title)
                            }
                        });
    
                        this.changeShape(element, interactions)
                        this.props.handleOpen("","interaction")
                    break;
                    case "interrelation":
                        let interrelations = []
                        parent = element.getParentCell()
                        if(parent !== null){
                            interrelations = parent.attributes.actions
                        }
                        this.changeShape(element, interrelations)
                        this.props.handleOpen("","interrelation")
                    break;
                    case "reaction":
                        let reactions = []
                        this.changeShape(element, reactions)
                        this.props.handleOpen("","reaction")
                    break;
                    default:
                        let cells = this.graph.getCells()
                        let names = []
                        
                        parent = element.getParentCell()
                        if(parent !== null && this.props.typeDiagram === "2"){
                            let name = parent.attributes.attrs.label.text
                            names = [name]

                        }if(parent === null && this.props.typeDiagram === "2"){
                            const allSuccesorsElement = this.graph.getSuccessors(element)
                            allSuccesorsElement.forEach(succesor => {
                                if(succesor.attributes.class === "object"){
                                    let name = succesor.attributes.attrs.label.text
                                    names.push(name)
                                }
                            });
                        }else if(this.props.typeDiagram === "1") {
                            names = getObjectsNames(cells, nameObject)
                            this.props.objects.forEach(element => {
                                names.push(element.name)
                            });
                        }
                        this.changeShape(element, names)
                        this.props.handleOpen("","object")
                      break;
                }
            }

        }.bind(this));



        this.paper.on('link:snap:connect', function(linkView, evt, targetView) {
            targetView.vel.addClass('visible');
        });
    
        this.paper.on('link:snap:disconnect link:connect', function(linkView, evt, targetView) {
            targetView.vel.removeClass('visible');
        });

        // Function for removing all tools when the mouse pointer is over the different figures (estereotipos)
        this.paper.on('cell:mouseleave', function(cellView, elementView) {
            cellView.removeTools();
            cellView.vel.removeClass('visible');
        });

        this.paper.$el.prepend([
            '<style>',
            '#' + this.paper.svg.id + ' .joint-port { visibility: hidden }',
            '#' + this.paper.svg.id + ' .visible .joint-port { visibility: visible; }',
            '</style>'
        ].join(' '));

        this.paper.options.snapLinks = true;

        // Function for adding all tools when the mouse pointer is over link 
        this.paper.on('link:mouseenter', function(linkView) {
            var verticesTool = new joint.linkTools.Vertices();
            var segmentsTool = new joint.linkTools.Segments();
            var targetArrowheadTool = new joint.linkTools.TargetArrowhead();
            var sourceAnchorTool = new joint.linkTools.SourceAnchor();
            var targetAnchorTool = new joint.linkTools.TargetAnchor();
            var boundaryTool = new joint.linkTools.Boundary();
            var removeButton = new joint.linkTools.Remove({
                action: function(evt, linkView, toolView) {

                    if(linkView.targetView !== null){
                        let destino = linkView.targetView.model
                        let fuente = linkView.sourceView.model
                        let parent = destino.getParentCell()

                        if(parent !== null){
                            unembedElements(parent, fuente.graph, destino)
                        }
                        filterValueOfArray(destino, fuente)
                    }
                    linkView.model.remove({ ui: true, tool: toolView.cid });
                    
                }
            });

            var toolsView = new joint.dia.ToolsView({
                tools: [
                    verticesTool, segmentsTool,
                     targetArrowheadTool,
                    sourceAnchorTool, targetAnchorTool,
                    boundaryTool, removeButton
                ]
            });
            linkView.addTools(toolsView);
        });

        // Function for removing all tools when the mouse pointer is over link 
        this.paper.on('link:mouseleave', function(linkView) {
            linkView.removeTools();
        });

        this.paper.on('element:pointerclick', function(view, evt) {
            //view.model.toFront({ deep: true });
        });
        
        this.graph.on('change', function(cell) { 
            let data1 = JSON.stringify(this.props.data)
            let data2 = JSON.stringify(this.graph.toJSON())
            if(this.type && !this.state.op5 && (data1 !== data2) ){
                this.setState({ op5: true })
            }else if(this.type && this.state.op5 && (data1 === data2)){
                this.setState({ op5: false })
            }
        }.bind(this))

    }

    /** 
    Function for saving the last changes in the diagram
    Diagram type 1:  all objects have to have name
    */


    saveDiagram = () => {
        this.graph.set('graphCustomProperty', true);
        this.graph.set('graphExportTime', Date.now());
        this.graph.set('zoomLevel', this.zoomLevel);
        let cells = this.graph.getCells()
        let error = allObjectsHaveNames(cells)
        let jsonData = this.graph.toJSON();
        if(!error){
            let message = "Todos los objetos en el diagrama deben de tener nombre"

            this.props.handleOpen(message,"information")
        }
        let idsRemoved = this.state.removed
        return {error, jsonData, idsRemoved }
    }

    /** 
    Function for adding all tools when the mouse pointer is over the different figures (estereotipos)
    */
    interactivity = () =>{ 
        this.paper.on('element:mouseenter', function(elementView, targetView) {
            var model = elementView.model;
            var bbox = model.getBBox();
            var ellipseRadius = (2);
            var offset = model.attr(['pointers', 'pointerShape']) === 'ellipse'
                ? { x: -ellipseRadius * bbox.width / 2, y: ellipseRadius * bbox.height / 2  }
                : { x: -3, y: 3 };

            elementView.vel.addClass('visible');

            var coorX = elementView.vel.node.attributes.removex.value
            var coorY = elementView.vel.node.attributes.removey.value
            let typeDiagram = this.props.typeDiagram
            let searchObject = this.props.searchObject
            let removeCell = this.removeCell
            let diagram = this
            elementView.addTools(new joint.dia.ToolsView({
                tools: [
                    new joint.elementTools.Remove({
                        useModelGeometry: true,
                        y: coorY,
                        x: coorX,
                        offset: offset,
                        action: function(evt, elementView, toolView) {
                            let parent = elementView.model.getParentCell()
                            if(parent !== null){
                                let destino = elementView.model
                                unembedElements(parent, parent.graph, destino)
                                filterValueOfArray(destino, parent)
                                
                            }
                            if(typeDiagram === "1" && elementView.model.attributes.class === 'object'){
                                searchObject(elementView.model, toolView, "confirmation")
                                diagram.setState({selected: elementView.model, handleClick: removeCell})
                            }else{
                                
                                elementView.model.remove({ ui: true, tool: toolView.cid });
                                let idsRemoved = diagram.state.removed

                                idsRemoved.push(elementView.model.attributes.attrs.root.rid)

                                diagram.setState({selected: null, removed: idsRemoved})
                            }
                            
                        }
                    })
                ]
            }));
        }.bind(this));

    }

    componentWillUnmount(){
        this.graph.clear()
    }

    updateDiagram = (diagrama) => {
        if(typeof diagrama === 'object' && !Array.isArray(diagrama)){
            this.graph.fromJSON(diagrama, this.namespace);
            this.zoomLevel = diagrama.zoomLevel
        }else{
            this.graph.clear()
        }

    }

    zoomIn = () => {
        this.zoomLevel = Math.min(3, this.zoomLevel + 0.2);
        this.zoomScale()
    }

    zoomOut = () => {
        this.zoomLevel = Math.max(0.2, this.zoomLevel - 0.2);
        this.zoomScale()
    }

    dottedLine = () => {
        var CustomLink = joint.shapes.standard.Link.define('standard.Link', {
            attrs: {
                line: {
                    strokeDasharray: '5 2'
                }
            },
        });

        this.paper.options.defaultLink = new CustomLink({
        });

        var links = this.graph.getLinks()
        
        links.forEach(element => {
            element.attr({
                line: { strokeDasharray: '5 2' }
            });
        });
    }

    continuousLine = () => {
        var CustomLink = joint.shapes.standard.Link.define('standard.Link', {
            attrs: {
                line: {
                    strokeDasharray: ''
                }
            },
        });

        this.paper.options.defaultLink = new CustomLink({
        });

        var links = this.graph.getLinks()

        links.forEach(element => {
            element.attr({
                line: { strokeDasharray: '' }
            });
        });
    }

    zoomScale = () => {
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    addFigure = (type) => {
        returnFigure(this.graph,type, this.zoomOut, this.zoomIn, this.continuousLine, this.dottedLine)
    }  

    removeCell = () => {
        this.state.selected.remove()
        this.props.handleClose()
        let idsRemoved = this.state.removed
        idsRemoved.push(this.state.selected.id)
        this.setState({selected: null, removed: idsRemoved})
    }

    changeShape = (shape, actions) => {

        this.setState({
          selected: shape,
          parentsActions: actions
        });

    };

    render() {
        const { classes, typeDiagram, type, list, objects, open, handleClose,message, modal } = this.props;
        if(type){
            if(this.paper !== undefined){
                this.paper.setInteractivity(true);
                this.interactivity()
            }
        }else{
            if(this.paper !== undefined){
                this.paper.setInteractivity(false);
                this.paper.removeTools()
            }
        }

        return (
            <div className={classes.root}>
                <Prompt
                    when={this.state.op5}
                    message="Hay cambios sin guardar. ¿Estás seguro de que quieres salir de esta página?"
                />
                <Panel listOfActions={list} action={this.addFigure}  />
                <div id="playground" ref="placeholder" ></div>
                <MessageDialog 
                    open={open} 
                    handleClose={handleClose}
                    message={message}
                    type={modal}
                    parentsActions={this.state.parentsActions}
                    object={this.state.selected}
                    typeDiagram={typeDiagram}
                    listObjects={objects}
                    handleClick={this.state.handleClick}
                />
            </div>
        );
    }
}

Graph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Graph)
