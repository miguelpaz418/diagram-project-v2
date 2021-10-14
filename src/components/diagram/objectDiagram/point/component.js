import React from "react";
import style from "styled-components";
//Components
import PointIcon from "./PoinIcon";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import type { DiagComponentProps } from "react-flow-diagram";

const styles = theme => ({
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  },
  chip: {
    margin: theme.spacing(1)
  }
});

const PointStyle = style.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 77rem;
  border: 3px solid #000;
`;

const Name = style.span`
  flex: auto;
  padding-top: 0.25rem;
`;

export type PointProps = DiagComponentProps & {
  name: string
};

const Point = (props: PointProps) => (
  <PointStyle width={props.model.width} height={props.model.height}>
    <Name>
      <PointIcon />
    </Name>
  </PointStyle>
);

type PointComponentProps = DiagComponentProps;
type PointComponentState = {
  name: string
};
class PointComponent extends React.PureComponent<
  PointComponentProps,
  PointComponentState
> {
  state = {
    name: this.props.model.name
  };

  render() {
    return <Point {...this.props} />;
  }
}

export default withStyles(styles)(PointComponent);
