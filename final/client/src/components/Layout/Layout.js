import React, {Fragment} from "react";
import PersistentDrawer from "../../containers/header/PersistentDrawer";

const layout = props => (
  <Fragment>
    <PersistentDrawer title="Hospital Gutierrez" subcontent= {props.children} />
  </Fragment>
)

export default layout;
