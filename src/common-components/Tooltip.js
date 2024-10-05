import React, { useState } from "react";

const Tooltip = ({ children, action, customContent }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = (e) => {
    e.stopPropagation(); // avoid event bubbling
    setVisible(true);
  };

  const hideTooltip = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const handleAction = (e) => {
    e.stopPropagation();
    action();
    setVisible(false);
  };

  return (
    <div className="relative inline-block" onMouseLeave={hideTooltip}>
      <span onClick={showTooltip}>{children}</span>

      {visible && (
        <div className={`absolute z-50`} onClick={(e) => e.stopPropagation()}>
          {customContent({ hideTooltip, handleAction })}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
