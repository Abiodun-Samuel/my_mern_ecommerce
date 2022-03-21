import React from "react";

const SectionHeader = ({ header, desc = false }) => {
  return (
    <div className="section">
      <h3 className="section_header">{header}</h3>
      <p className="section_desc">{desc && desc}</p>
    </div>
  );
};

export default SectionHeader;
