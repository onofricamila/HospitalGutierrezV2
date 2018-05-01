import React, {Fragment} from "react";
import PersistentDrawer from "./header/PersistentDrawer";
import LabelBottomNavigation from "./footer/LabelBottomNavigation";

const layout = props => (
  <Fragment>
    <PersistentDrawer title="Hospital Gutierrez" subcontent= {props.children}/>
    <LabelBottomNavigation />
  </Fragment>
)

export default layout;
