import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";

export default function TestIcon(props) {
  let path =
    "M12.5 0c-6.904 0-12.5 5.596-12.5 12.5s5.596 12.5 12.5 12.5 12.5-5.596 12.5-12.5-5.596-12.5-12.5-12.5zM12.5 21.875c-5.178 0-9.375-4.197-9.375-9.375s4.197-9.375 9.375-9.375c5.178 0 9.375 4.197 9.375 9.375s-4.197 9.375-9.375 9.375zM7.813 12.5c0-2.589 2.099-4.688 4.688-4.688s4.688 2.099 4.688 4.688c0 2.589-2.099 4.688-4.688 4.688s-4.688-2.099-4.688-4.688z";
  let tooltip = "intersección";

  return (
    <Tooltip title={tooltip} placement="top">
      <div>
        <SvgIcon viewBox="0 0 25 25" style={{ fontSize: 28 }}>
          <path d={path} />
        </SvgIcon>
      </div>
    </Tooltip>
  );
}
