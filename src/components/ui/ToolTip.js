import './ToolTip.scss';

function ToolTip({ tooltip, children }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="tooltipContainer">
      {children}
      <span className="tooltipText">{tooltip}</span>
    </div>
  )
}

export default ToolTip;