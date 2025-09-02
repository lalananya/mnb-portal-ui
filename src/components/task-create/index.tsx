import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { SelectChangeEvent } from "@mui/material";

interface TaskState {
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskScheduled: string;
}

export const TaskCreate: React.FC = () => {
  const [commonTaskData, setCommonTaskData] = useState<{
    typeOptions: string[];
    frequencyOptions: string[];
  }>({ typeOptions: [], frequencyOptions: [] });

  const [state, setState] = useState<TaskState>({
    taskName: "",
    taskDescription: "",
    taskType: "",
    taskScheduled: "",
  });

  useEffect(() => {
    // Initialize common options
    // serviceFetchCommonTaskDetails
    setCommonTaskData({
      typeOptions: ["User Defined", "Report Generation", "Subscriptions", "Clean DB", "Clean Caches"],
      frequencyOptions: ["Every Day", "Every Month", "Every Year", "Custom"],
    });
  }, []);

  useEffect(() => {
    
  }, [state.taskType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = () => {
    // if (state.taskName.trim() !== "") {
    //   console.log("Task Added:", state);
    //   // Reset form
    //   setState({
    //     taskName: "",
    //     taskDescription: "",
    //     taskType: "",
    //     taskScheduled: "",
    //   });
    // }
  };

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="Task Name"
        fullWidth
        name="taskName"
        value={state.taskName}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        label="Task Description"
        fullWidth
        name="taskDescription"
        value={state.taskDescription}
        onChange={handleChange}
      />

      <FormControl fullWidth margin="dense">
        <InputLabel>Task Type</InputLabel>
        <Select
          value={state.taskType}
          name="taskType"
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
        >
          {commonTaskData.typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel>Task Frequency</InputLabel>
        <Select
          value={state.taskScheduled}
          name="taskScheduled"
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
        >
          {commonTaskData.frequencyOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleAdd} variant="contained" color="primary">
        Add
      </Button>
    </>
  );
};
