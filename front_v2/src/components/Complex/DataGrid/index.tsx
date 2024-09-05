/* eslint-disable @typescript-eslint/no-explicit-any */
import {DataGrid as XDataGrid, GridColDef, ptBR} from '@mui/x-data-grid';
import React, {useState} from 'react';

type Props = {
	rowsData: any[];
	columns: GridColDef<any>[];
	checkboxSelection?: boolean;
};

const DataGrid = ({rowsData, columns, checkboxSelection}: Props) => {
	const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10});

	return (
		<XDataGrid
			style={{fontFamily: 'Ubunto'}}
			localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
			autoHeight
			rows={rowsData ?? []}
			rowCount={rowsData?.length ?? 0}
			getRowId={row => row._ref ?? row.ref ?? row.id}
			pageSizeOptions={[10, 50, 100]}
			disableRowSelectionOnClick
			paginationModel={paginationModel}
			onPaginationModelChange={e => setPaginationModel(e)}
			columns={columns}
			checkboxSelection={checkboxSelection}
		/>
	);
};

export default DataGrid;
