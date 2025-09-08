import React, { useState, useEffect, useDeferredValue } from "react";
import { Box, Button, Container, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";

import { RenderTableRow } from "./common";
import { serviceFetchTaskList } from "../../external/services";

export const TaskList : React.FC<any> = () => {
  
  /**
   * we can use useDeffered if the data set is huge and we are switching the pages to often and quickly
   * also this pagination does not involve DB involvement and there is no fetchnig from DB  on each switch
   */
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  // const [viewData, setViewData] = useState([]);

  const moveFwd = () => ((pageIndex + 1) * 10 < data.length) && setPageIndex(pageIndex+1);
  const moveBwd = () => (pageIndex > 0) && setPageIndex(pageIndex-1);

  const getData = async () => {
    const response = await serviceFetchTaskList();
    setData(response?.taskData);
  }

  const slicedData = data.slice(pageIndex*10, (pageIndex*10)+10);
  const viewData = useDeferredValue(slicedData);

  /**
   * useDefferedValue is a concurrent rendering hook, 
   * it lets you update some state as non urgent, 
   * urgent involves -> user interactive, typing of input, switch between tabs
   * React defers rendering the deffered value until it has time.
   * 
   * mostly used when you want to filterout huge set of data, but do not want typing or button to feel laggy
   * 
   * it stores not not state current value btu also lagged behind value
   */

  // useEffect(() => {
  //   const start = ;
  //   const end = start + 10;
  //   setViewData(data.slice(start, end)); // slice gives us this flexibility
  // }, [pageIndex, data])

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box display="flex" gap={2} flexDirection={"column"}>
      <Container sx={{ mt: 1}}>
        <Button variant="contained" onClick={moveBwd} sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }} disabled={pageIndex === 0}>{'<'}</Button>
        <Button variant="contained" onClick={moveFwd} sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }} disabled={((pageIndex + 1) * 10 >= data.length)}>{'>'}</Button>
      </Container>
      <Container sx={{ mt: 1 }}>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f9fafb" }}>
              <RenderTableRow task={
                    {   
                        taskId : "Task ID", 
                        taskName : "Task Name", 
                        taskDetails : "Details", 
                        taskDescription : "Description", 
                        taskStatus : "Status", 
                        taskScheduled : "Scheduled"
                    }
              }/>
            </TableHead>
            <TableBody>
              {viewData?.map((task : any) => ( <RenderTableRow task={task} key={task.taskId}/>))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
