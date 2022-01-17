import React, { Fragment, ReactNode } from "react";
import ContentLoader from "react-content-loader";

export const TableLoader = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 1000 500"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >
    {/** header start */}
    <rect x="0" y="0" width="1000" height="10" />
    <rect x="0" y="25" width="1000" height="10" />
    <rect x="0" y="5" width="68" height="25" />
    <rect x="150" y="5" width="168" height="25" />
    <rect x="450" y="5" width="168" height="25" />
    <rect x="700" y="5" width="168" height="25" />
    <rect x="900" y="5" width="168" height="25" />
    {/** header end */}
    {/** row start */}
    <circle cx="879" cy="65" r="11" />
    <circle cx="914" cy="65" r="11" />
    <rect x="34" y="59" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="59" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="59" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="95" rx="3" ry="3" width="1000" height="1" />
    {/** row end */}

    <circle cx="879" cy="125" r="11" />
    <circle cx="914" cy="125" r="11" />
    <rect x="34" y="119" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="119" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="119" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="155" rx="3" ry="3" width="1000" height="1" />

    <circle cx="880" cy="184" r="11" />
    <circle cx="915" cy="184" r="11" />
    <rect x="34" y="176" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="175" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="175" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="215" rx="3" ry="3" width="1000" height="1" />

    <circle cx="881" cy="242" r="11" />
    <circle cx="916" cy="242" r="11" />
    <rect x="34" y="234" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="233" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="233" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="275" rx="3" ry="3" width="1000" height="1" />

    <circle cx="882" cy="303" r="11" />
    <circle cx="917" cy="303" r="11" />
    <rect x="34" y="295" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="294" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="294" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="335" rx="3" ry="3" width="1000" height="1" />

    <circle cx="881" cy="363" r="11" />
    <circle cx="916" cy="363" r="11" />
    <rect x="34" y="355" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="354" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="354" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="395" rx="3" ry="3" width="1000" height="1" />

    <circle cx="882" cy="424" r="11" />
    <circle cx="917" cy="424" r="11" />
    <rect x="34" y="416" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="415" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="415" rx="3" ry="3" width="200" height="15" />
    <rect x="0" y="455" rx="3" ry="3" width="1000" height="1" />

    <circle cx="882" cy="484" r="11" />
    <circle cx="917" cy="484" r="11" />
    <rect x="34" y="476" rx="3" ry="3" width="150" height="15" />
    <rect x="255" y="475" rx="3" ry="3" width="299" height="15" />
    <rect x="600" y="475" rx="3" ry="3" width="200" height="15" />

    {/* <rect x="0" y="0" rx="3" ry="3" width="1" height="550" />
        <rect x="998" y="0" rx="3" ry="3" width="1" height="550" /> */}
  </ContentLoader>
);

const getRows = (size) => {
  const rows = [];
  for (let i = 0; i < size; i += 1) {
    rows.push(
      <Fragment key={i}>
        <rect x="9" y={`${i * 45 + 9}`} rx="2" ry="2" width="982" height="14" />
        <rect x="0" y={`${i * 45 + 44}`} width="1000" height="1" />
      </Fragment>
    );
  }
  return rows;
};

export const TableBodyLoader = ({ size, ...props }) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox={`0 0 1000 ${45 * size}`}
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
      {...props}
    >
      {getRows(size)}
    </ContentLoader>
  );
};
