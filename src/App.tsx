import React, { useState } from 'react';
import { useEffect } from 'react';
import Table from './components/table'
import { getMatches } from './api/matches';
import { MatchTableRow } from './utils/interfaces/matches';
import { matchesToTableData } from './utils/functions';

function App() {
  const [data, setData] = useState<MatchTableRow[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
   }, [])

   async function getData () {
    setLoading(true)
    try {
      const apiResults = await getMatches()
      const tableData = matchesToTableData(apiResults)
      setData(tableData)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
   }

  return (
    <div className="App">
      <Table data={data} refreshTableData={getData}/>
    </div>
  );
}

export default App;
