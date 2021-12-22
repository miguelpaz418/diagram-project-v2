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
        changeValueToArray
    } from './functionsDiagram'

import ObjectModal from './hardware/component';
import MessageDialog from './messageDialog';
import ActionModal from './action/component';
import AttributeModal from './attribute/component';
import ChipIconsAction from './action/chipIconsAction'


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
        this.data = this.props.data
        this.type = this.props.type
        this.list = []
        this.state = {
            op: false,
            op2: false,
            op3: false,
            op4: false,
            selected: null,
            nameObject: "",
            attributeName: "",
            attributeComplete: "",
            value: "",
            attributeType: "text",
            colorObject: "",
            colorName: "",
            parentsActions: [],
            namesObjects: [],
            message: "",
            errors: {}
        };

        var CustomLink = joint.shapes.standard.Link.define('standard.Link', {
        });

        this.linkDefau = new CustomLink({
        });
    }


    componentDidMount() {

        if(typeof this.data === 'object' && !Array.isArray(this.data)){
            this.graph.fromJSON(this.data, this.namespace);
            this.zoomLevel = this.data.zoomLevel

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
            const { res, message} = constraintsObjects(fuente,destino)
            let title = destino.attributes.attrs.root.title

            if(res){
                linkView.model.remove()
                this.handleOpenMessage(message)
            }else{
                fuente.embed(destino)
                fuente.embed(linkView.model)
                if(destino.attributes.class === 'interaction'){
                    linkView.model.attr({
                       line: { strokeDasharray: '5 2' }
                    });
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
            const fuente = linkView.sourceView.model
            const destino = targetView.model
            fuente.unembed(destino)
            filterValueOfArray(destino, fuente)
        });


                /** 
        Function for showing the related modal to the esterotipo
        Event when double click
        */

        this.paper.on('element:pointerdblclick', function(elementView, evt) {

            var element = elementView.model;
            var nameObject = undefinedToEmpty(element.attr(['label', 'text']))
            var colorName = undefinedToEmpty(element.attr(['label', 'fill']))
            var colorObject = undefinedToEmpty(element.attr(['body', 'fill']))
            var attributeComplete = undefinedToEmpty(element.attr(['root', 'key']))
            var value = undefinedToEmpty(element.attr(['root', 'attrval']))
            let parent = []

            switch (element.attributes.class) {
                case "action":
                    let actions = []
                    parent = element.getParentCell()
                    if(parent !== null){
                        actions = parent.attributes.actions
                    }
                    this.changeShape(element, "", "", "", "", "", "", actions)
                    this.handleOpen();
                  break;
                case "attribute":
                    if(nameObject !== undefined){
                        var attributeName = nameObject.split(":")[0]
                    }
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
                    this.changeShape(element, nameObject, "", "", attributeComplete, value, attributeName, attributes)
                    this.handleOpenAttribute();
                  break;
                default:
                    let cells = this.graph.getCells()
                    let names = getObjectsNames(cells, nameObject)
                    if(names.length > 0){
                        this.setState({
                            namesObjects: names
                        })
                    }
                    this.changeShape(element, nameObject, colorObject, colorName, "", "", "", "")
                    this.handleOpenObject();
                  break;
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
            var sourceArrowheadTool = new joint.linkTools.SourceArrowhead();
            var targetArrowheadTool = new joint.linkTools.TargetArrowhead();
            var sourceAnchorTool = new joint.linkTools.SourceAnchor();
            var targetAnchorTool = new joint.linkTools.TargetAnchor();
            var boundaryTool = new joint.linkTools.Boundary();
            var removeButton = new joint.linkTools.Remove({
                action: function(evt, linkView, toolView) {
                    linkView.model.remove({ ui: true, tool: toolView.cid });
                    if(linkView.targetView !== null){
                        let destino = linkView.targetView.model
                        let fuente = linkView.sourceView.model
                        fuente.unembed(destino)
                        filterValueOfArray(destino, fuente)
                    }
                    
                }
            });

            var toolsView = new joint.dia.ToolsView({
                tools: [
                    verticesTool, segmentsTool,
                    sourceArrowheadTool, targetArrowheadTool,
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
            this.handleOpenMessage(message)
        }
        return {error, jsonData}
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

            elementView.addTools(new joint.dia.ToolsView({
                tools: [
                    new joint.elementTools.Remove({
                        useModelGeometry: true,
                        y: coorY,
                        x: coorX,
                        offset: offset,
                        action: function(evt, elementView, toolView) {
                            let parent = elementView.model.getParentCell()
                            elementView.model.remove({ ui: true, tool: toolView.cid });
                            if(parent !== null){
                                let destino = elementView.model
                                filterValueOfArray(destino, parent)
                            }
                        }
                    })
                ]
            }));
        });

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

    zoomScale = () => {
        var size = this.paper.getComputedSize();
        this.paper.translate(0,0);
        this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
    }

    addFigure = (type) => {
        returnFigure(this.graph,type, this.zoomOut, this.zoomIn)
    }  

    changeShape = (shape, nameObject, colorObject, colorName, attributeComplete, value, attributeName, actions) => {
        var attributeType = "text"
        attributeType = attributeComplete.split("-")[1]
        
        this.setState({
          selected: shape,
          nameObject: nameObject,
          colorObject: colorObject,
          colorName: colorName,
          attributeComplete: attributeComplete,
          value: value,
          attributeName: attributeName,
          attributeType: attributeType,
          parentsActions: actions
        });

    };

    handleOpen = () => {
        this.setState({
          op: true
        });
    };

    handleClose = () => {
        this.setState({
            op: false
          });
    };

    handleClick =( event, data) => {
        event.preventDefault();

        var element = this.state.selected
        var svgFile = ChipIconsAction(data)
        let previousTitle = element.attributes.attrs.root.title
        element.attr('image/xlinkHref', 'data:image/svg+xml;utf8,' + encodeURIComponent(svgFile));
        element.attr('root/title', data);
        let parent = element.getParentCell()

        if(parent !== null){
            changeValueToArray (parent, previousTitle, data, "actions")
        }
        
        this.setState({
            selected: null,
            nameObject: "",
            op: false,
            parentsActions: []
        });
    };

    handleOpenObject = () => {
        this.setState({
          op2: true
        });
    };

    handleCloseObject = () => {
        this.setState({
            op2: false,
            errors: {}
          });
    };

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    handleChange2 = (event,name) => {
        this.setState({
            [name]: event.css.backgroundColor
        });
    };

    handleClickObject = (event) => {
        event.preventDefault();
        var text = this.state.nameObject
        var element = this.state.selected
        let errors = {};
        if (text !== null) {
            if (this.state.namesObjects.includes(text.toLowerCase())){
                errors.nameObject = "name is already used";
                this.setState({
                    errors: errors
                });

            }else if(text === ""){
                errors.nameObject = "Must not be empty";
                this.setState({
                    errors: errors
                });
            }else{
                element.attr({
                    label: { text: this.state.nameObject, fill: this.state.colorName },
                    root: { labelcolor: this.state.colorName },
                    body: { fill: this.state.colorObject }
                });
                this.setState({
                    selected: null,
                    nameObject: "",
                    colorObject: "",
                    colorName: "",
                    op2: false,
                    errors: {}
                });
            }

        }
    };


    handleOpenAttribute = () => {
        this.setState({
          op3: true
        });
    };

    handleCloseAttribute = () => {
        this.setState({
            op3: false
          });
    };

    handleOpenMessage = (message) => {
        this.setState({
          op4: true,
          message: message
        });
    };

    handleCloseMessage = () => {
        this.setState({
            op4: false,
            message: ""
          });
    };


    handleClickAttribute = event => {
        event.preventDefault();
        var element = this.state.selected
        let previousTitle = element.attributes.attrs.root.title
        var text = this.state.attributeName + ': ' + this.state.value
        if (text !== null) {
            element.attr({
                label: { text: text },
                root: { 
                    key: this.state.attributeComplete,
                    attrval: this.state.value,
                    title: this.state.attributeName
                }
            });
            let parent = element.getParentCell()
            if(parent !== null){
                changeValueToArray (parent, previousTitle, this.state.attributeName, "attributes")
            }

            this.setState({
                selected: null,
                attributeName: "",
                value: "",
                attributeType: "",
                attributeComplete: "",
                op3: false,
            });
        }
    };

    handleChangeAttribute = event => {
        let label = event.nativeEvent.target.textContent;
        let arrayDeCadenas = event.target.value.split("-");
        this.setState({
          attributeComplete: event.target.value,
          attributeName: label,
          attributeType: arrayDeCadenas[1],
          value: "",
        });
      };
    
    handleChange2Attribute = event => {
        this.setState({
            [event.target.name]: this.validateChange(event.target.value)
        });
    };

    validateChange = (value) => {
        if(this.state.attributeType === 'number' && !Number(value)){
            return value.replace(/\D/g, '');
        }
        return value
    };

    render() {
        const { classes, typeDiagram, userId, diagramUserId, list } = this.props;
        if(diagramUserId === userId){
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
        let modalsOfDiagram = "";
        switch (typeDiagram) {
            case "1":
                modalsOfDiagram = <div>
                    <ActionModal 
                        open={this.state.op} 
                        handleOpen={this.handleOpen} 
                        handleClose={this.handleClose} 
                        handleClick={this.handleClick}
                        parentsActions={this.state.parentsActions}
                    />
                    <ObjectModal 
                        open={this.state.op2} 
                        handleOpen={this.handleOpenObject} 
                        handleClose={this.handleCloseObject} 
                        handleClick={this.handleClickObject} 
                        handleChange={this.handleChange} 
                        handleChange2={this.handleChange2} 
                        nameObject={this.state.nameObject} 
                        colorObject={this.state.colorObject} 
                        colorName={this.state.colorName}
                        errors={this.state.errors}
                    />
                    <AttributeModal 
                        open={this.state.op3} 
                        handleOpen={this.handleOpenAttribute} 
                        handleClose={this.handleCloseAttribute} 
                        handleClick={this.handleClickAttribute} 
                        handleChange={this.handleChangeAttribute} 
                        handleChange2={this.handleChange2Attribute}  
                        attributeComplete= {this.state.attributeComplete} 
                        value={this.state.value}
                        parentsAttributes={this.state.parentsActions}
                    />
                </div>
            break;
            case "3":
                modalsOfDiagram = <div>
                    <ObjectModal 
                        open={this.state.op2} 
                        handleOpen={this.handleOpenObject} 
                        handleClose={this.handleCloseObject} 
                        handleClick={this.handleClickObject} 
                        handleChange={this.handleChange} 
                        handleChange2={this.handleChange2} 
                        nameObject={this.state.nameObject} 
                        colorObject={this.state.colorObject} 
                        colorName={this.state.colorName}
                        errors={this.state.errors}
                    />
                </div>
            break;
            default:
                modalsOfDiagram = <div></div>
            break;
          }

        return (
            <div className={classes.root}>
                <Panel listOfActions={list} action={this.addFigure}  />
                <div id="playground" ref="placeholder" ></div>
                {modalsOfDiagram}
                <MessageDialog 
                    open={this.state.op4} 
                    handleOpen={this.handleOpenMessage} 
                    handleClose={this.handleCloseMessage}
                    message={this.state.message}
                />
            </div>
        );
    }
}

Graph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Graph)
