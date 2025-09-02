import React, { useState, useEffect } from "react";
import { Container, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";

import { TaskAdd } from "../task-add";
import { RenderTableRow } from "./common";
import { serviceFetchTaskList } from "../../external/services";

const leads = [
  { 
    taskName: "John Doe",
    taskId: "T-001",
    taskDetails: "+1 8581234567", 
    taskDescription: "qa.im.info@example.cn", 
    taskStatus: "Recycled",
    taskScheduled: "2025-08-30 10:00 AM" 
  },
  { 
    taskName: "Daniel Wilson",
    taskId: "T-002",
    taskDetails: "+1 5034567890", 
    taskDescription: "info@futurelabs.org", 
    taskStatus: "New",
    taskScheduled: "2025-09-01 11:00 AM" 
  },
];

export const TaskList : React.FC<any> = () => {
  
  const [data, setData] = useState(leads);
  const getData = async () => {
    const response = await serviceFetchTaskList();
    setData(response);
  }

  useEffect(() => {
    // getData();
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
