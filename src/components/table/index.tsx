import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MatchTableRow } from '../../utils/interfaces/matches';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { addMatch, deleteMatch } from '../../api/matches';

interface Props {
    data: MatchTableRow[]
    refreshTableData: () => void
    loading: boolean
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'teams', headerName: 'TEAMS', width: 280 },
  { field: 'date', headerName: 'DATE', width: 120 },
  { field: 'time', headerName: 'TIME', width: 120 },
  { field: 'result', headerName: 'RESULTS', width: 150 },
];

export default function DataTable(props: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function handleChange(rowsIds: any) {
    setSelectedIds(rowsIds)
  }

  function deleteSelectedLines () {
    deleteMatch(selectedIds)
    props.refreshTableData()
  }
  function addNewMatch () {
    addMatch()
    props.refreshTableData()
  }

  return (
    <div style={{ width: '875px', margin: 'auto' }}>
      <div style={{ height: '55px'}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
        {selectedIds.length > 0 && 
          <Button 
            variant="outlined" 
            startIcon={<DeleteIcon />} 
            style={{padding:"15px"}}
            onClick={deleteSelectedLines}
          >
            Delete selected line{selectedIds.length > 1 ? 's' : ''}
          </Button>
        }
        {selectedIds.length <= 0 && 
          <div style={{fontStyle: 'italic', fontSize: '14px'}}>* Select a line in ordert to delete it</div>
        }
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />} 
          style={{padding:"15px"}}
          onClick={addNewMatch}
        >
          add new row
        </Button>
      </div>
      </div>
      <div style={{ height: '750px', maxHeight: 'calc(100vh - 60px)' }}>
        <DataGrid
          rows={props.data}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[12]}
          onSelectionModelChange={handleChange}
          loading={props.loading}
          checkboxSelection
        />
      </div>
    </div>

  );
}