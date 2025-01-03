/* eslint-disable react/display-name */
import { Box } from "@mui/material";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { forwardRef } from "react";

const ReactEchart = forwardRef(({ option, ...rest }, ref) => {
  return (
    <Box
      component={ReactEChartsCore}
      ref={ref}
      option={{
        ...option,
        tooltip: {
          ...option.tooltip,
          confine: true,
        },
      }}
      {...rest}
    />
  );
});

export default ReactEchart;
