import React from "react";
import ContentLoader from "react-content-loader";

export const ContentLoaders = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="120"
      height="22"
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="122" height="20" />
    </ContentLoader>
  );
};

export const ChartLoaders = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="190"
      height="190"
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="0" y="0" rx="4" ry="4" width="190" height="190" />
    </ContentLoader>
  );
};
