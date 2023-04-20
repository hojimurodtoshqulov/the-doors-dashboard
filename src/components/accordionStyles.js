export const accordionStyles = {
  backgroundColor: "transparent",
  boxShadow: "none",
  margin: "0",
  "&:before": {
    backgroundColor: "white",
    opacity: "0.17",
  },
  "&.Mui-expanded": {
    margin: "0",
    "&:before": {
      opacity: "0.17",
    },
  },
};

export const accordionSummeryStyles = {
  "&.Mui-expanded": {
    minHeight: "none",
    height: "100%",
  },
};
