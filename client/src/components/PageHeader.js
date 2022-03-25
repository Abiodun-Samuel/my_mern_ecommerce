const PageHeader = ({ header, desc = false }) => {
  return (
    <div className="pageheader">
      <h3 className="header">{header}</h3>
      {desc && <p className="desc">{desc}</p>}
    </div>
  );
};

export default PageHeader;
