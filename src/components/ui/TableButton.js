import './TableButton.scss';

function TableButton({ onClick,id,className,children }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <button onClick={onClick} id={id} className={className}>
      {children}
    </button>
  )
}

export default TableButton;