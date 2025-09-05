import React, { useState, useEffect } from "react";
import { Container, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";

import { TaskAdd } from "../task-add";
import { RenderTableRow } from "./common";
import { serviceFetchTaskList } from "../../external/services";

export const TaskList : React.FC<any> = () => {
  
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await serviceFetchTaskList();
    setData(response?.taskData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <TaskAdd/>
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
              {data.map((task) => ( <RenderTableRow task={task}/>))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
