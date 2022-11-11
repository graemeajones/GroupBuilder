import './DataTable.scss';

function DataTable({objects, idKey, fieldOrder, headers, emptyMessage, containsButtons=false}) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  const ListOfJSXHeaders = () => headers.map((value, index) => (
      <th key={index}>{value}</th>
    ));

  const ListOfJSXCells = (rowObj) => fieldOrder.map((key, index) => (
      <td key={index}> { rowObj[key] } </td>
    ));

  // View ----------------------------------------
  return (
    !objects
      ? <p className="Tempty">{emptyMessage}</p>
      : <table>
          <thead>
            <tr>
              {
                ListOfJSXHeaders()
              }
            </tr> 
          </thead> 
          <tbody>
            {
              objects.map((rowObj) => {
                return (
                  <tr
                    key={rowObj[idKey]}
                    className={containsButtons && "containsButtons"}
                  >
                    {
                      ListOfJSXCells(rowObj)
                    }
                  </tr>
                )
              })
            }
          </tbody> 
        </table> 
  );
}

export default DataTable;