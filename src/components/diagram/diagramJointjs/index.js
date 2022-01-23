import React, { Component } from "react";
import PropTypes from "prop-types";
//Joint js
import Diagram from "./diagram"
//MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
//Icons
import SaveIcon from "@material-ui/icons/Save";
//Redux
import { saveDiagram, searchObject, closeModal, toOpenModal } from "../../../redux/actions/dataActions";
import { connect } from "react-redux";

import { returnAction } from './config-panel'
const styles = theme => ({
  diagram: {
    flexGrow: 1
  },
  diagramContainer: {
    "@media (min-width: 1000px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "32rem",
      maxHeight: "32rem",
      minWidth: "50rem",
      maxWidth: "50rem"
    },
    "@media (min-width: 1200px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "48rem",
      maxHeight: "48rem",
      minWidth: "56rem",
      maxWidth: "56rem"
    },
    "@media (min-width: 1600px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "41rem",
      maxHeight: "41rem",
      minWidth: "65.5rem",
      maxWidth: "65.5rem"
    },
    "@media (min-width: 1920px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "62rem",
      maxHeight: "62rem",
      minWidth: "70rem",
      maxWidth: "70rem"
    }
  },
  buttonSave: {
    "@media (min-width: 1000px)": {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem"
    },
    "@media (min-width: 1200px)": {
      position: "absolute",
      bottom: "2.8rem",
      right: "3.8rem"
    },
    "@media (min-width: 1600px)": {
      position: "absolute",
      bottom: "2rem",
      right: "7rem"
    },
    "@media (min-width: 1920px)": {
      position: "absolute",
      bottom: "2rem",
      right: "14rem"
    }
  }
});

class ObjectDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: this.props.diagram,
      list: [],
      objects: []
    };
    this.child = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    const {error, jsonData, idsRemoved, idsModificated} = this.child.current.saveDiagram()
    const {
      data: {
        removed
      }
    } = this.props;
    if(error){
      const updateDiagram = JSON.stringify(jsonData);
      let idsRemoved2 = idsRemoved.concat(removed);
      const diagram = {
        diagram: updateDiagram,
        idsRemoved : idsRemoved2, 
        idsModificated
      };
      const projectId = this.props.projectId;
      const diagramId = this.props.diagramId;
      this.props.saveDiagram(diagram, diagramId, projectId);
    }

  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevDiagrama = prevProps.data.diagram.diagram
    let diagrama = this.props.data.diagram.diagram
    if (prevDiagrama !== diagrama ) {
      this.child.current.updateDiagram(JSON.parse(diagrama))
    }
  }

  componentDidMount(){
    const {
      data: {
        diagram,
        project: { diagrams }
      }
    } = this.props;

    let objects = []

    if(diagrams !== undefined){
      objects = this.getListObjects(diagrams, diagram.diagramId)
    }

    //let objects = this.getListObjects(diagrams, diagram.diagramId)

    this.setState({objects: objects})
  }


  getPanel = () => {
    const {
      user: {
        credentials: { userId }
      },
      data: {
        project: { diagrams }
      },
      diagramUserId,
      type,
    } = this.props;
    const typeUser = diagramUserId === userId
    let actions = ["in","out"]
    let list = []
    let objects = []
    let action = {}
    let actions2 = []

    if(typeUser){
      objects = [ "Objecto multimedia", "Objecto hardware", "Objecto pasivo" ]
      if(type === "1"){
        actions2 = ["action","attribute"]
        objects = objects.concat(actions2)


      }else if(type === "2"){
        actions2 = ["interrelation", 'reaction']
        if(diagrams !== undefined){
          objects = this.panel(diagrams)
        }
        objects = objects.concat(actions2)

      }else if(type === "3"){
        actions2 = ["interaction","dotted","continuous"]
        if(diagrams !== undefined){
          objects = this.panel(diagrams)
        }
        objects = objects.concat(actions2)
      }
      actions = actions.concat(objects)

    }
    actions.forEach(element => {
      action = returnAction(element)
      list.push(action)
    });
    
    return list
  };

  panel = (diagrams) => {
    let objects = []
    diagrams.forEach(diagram => {
      if(diagram.type === "1"){
        diagram.objects.forEach(obj => {
          if(objects.length < 3 && !objects.includes(obj.shape)){
            objects.push(obj.shape)
          }else{
            return objects
          }
        });
      }
      
    });
    return objects
  };

  getListObjects = (diagrams, id) => {
    let objects = []
    diagrams.forEach(diagram => {
      if(diagram.type === "1" && diagram.diagramId !== id){
        diagram.objects.forEach(obj => {
          objects.push(obj)
        });
      }
      
    });
    return objects
  };


  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { userId },
        loading
      },
      data: {
        diagram
      },
      ui: {
        modal,
        openModal,
        messageModal
      },
      closeModal,
      toOpenModal,
      diagramUserId,
      type,
    } = this.props;


    const reduxDiagram = JSON.parse(diagram.diagram);
    const typeUser = diagramUserId === userId
    let list = this.getPanel()

    /**
     *     
    let objects = []
    if(diagrams !== undefined){
      objects = this.getListObjects(diagrams, diagram.diagramId)
    }
    */
    return (
      <>
        <div className={classes.diagram}>
          <CssBaseline />
          <div className={classes.diagramContainer}>
            {authenticated && !loading && 
              <Diagram ref={this.child} 
                searchObject={this.props.searchObject} 
                type={typeUser} 
                list={list} 
                objects={this.state.objects} 
                typeDiagram={type} 
                data={reduxDiagram}
                open={openModal} 
                handleClose={closeModal}
                message={messageModal}
                modal={modal}
                handleOpen={toOpenModal}
              />
            }
            {authenticated && diagramUserId === userId ? (
              <Fab
                title="guardar diagrama"
                color="primary"
                aria-label="Save"
                size="medium"
                onClick={this.handleSubmit}
                className={classes.buttonSave}
              >
                <SaveIcon />
              </Fab>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

ObjectDiagram.propTypes = {
  saveDiagram: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  data: state.data,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { saveDiagram, searchObject, closeModal, toOpenModal }
)(withStyles(styles)(ObjectDiagram));