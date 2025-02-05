function Table({ columns, data, renderActions }) {
  if (columns === null || data === null || renderActions === null) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  return (
    <div id="dynamicTable">
      <table>
        <thead>
          <tr>
            <td colSpan="5">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Axtar..." />
            </td>
          </tr>

          <tr>
            <th>#</th>
            {columns &&
              columns.map((column) => <th key={column.key}>{column.label}</th>)}
              <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{++index}</td>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
                {renderActions && <td>{renderActions(item)}</td>}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
