import React, {Fragment} from "react";
import PersistentDrawer from "./header/PersistentDrawerNew";
import LabelBottomNavigation from "./footer/LabelBottomNavigation";

const layout = props => (
  <Fragment>
    <PersistentDrawer title="Hospital Gutierrez" subcontent= {props.children} onLogout={props.onLogout} session={props.session} title={props.title}/>
    <LabelBottomNavigation />
  </Fragment>
)

export default layout;
