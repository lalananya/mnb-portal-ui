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
import { serviceCreateNewTask, serviceFetchCommonTaskDetails } from "../../external/services";

interface TaskState {
  taskName: string;
  taskDescription: string;
  taskDetail: string;
  taskScheduledFor: string;
}

export const TaskCreate: React.FC = () => {
  const [commonTaskData, setCommonTaskData] = useState<{
    typeOptions: string[];
    frequencyOptions: string[];
  }>({ typeOptions: [], frequencyOptions: [] });

  const [state, setState] = useState<TaskState>({
    taskName: "",
    taskDescription: "",
    taskDetail: "",
    taskScheduledFor: "",
  });

  const getCommonTaskDetails = async () => {
    const response = await serviceFetchCommonTaskDetails();
    setCommonTaskData({
      typeOptions : response?.typeOptions,
      frequencyOptions : response?.frequencyOptions
    })
  };
  
  useEffect(() => {
    getCommonTaskDetails();
  }, []);

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
    serviceCreateNewTask(state);
  };

  const renderWithFormWrapper = (jsx : React.ReactElement) => {
    return (
      <FormControl fullWidth sx={{ mt: 2, mb : 2 }}>
        {jsx}
      </FormControl>
    )
  }

  return (
    <>
        {renderWithFormWrapper(<TextField
          autoFocus
          label="Task Name"
          fullWidth
          name="taskName"
          value={state.taskName}
          onChange={handleChange}
        />)}
        {renderWithFormWrapper(<TextField
          label="Task Description"
          fullWidth
          name="taskDescription"
          value={state.taskDescription}
          onChange={handleChange}
        />)}
        {renderWithFormWrapper(<>
        <InputLabel>Task Type</InputLabel>
        <Select
          value={state.taskDetail}
          name="taskDetail"
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
        >
          {commonTaskData.typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        </>)}
        {renderWithFormWrapper(<>
        <InputLabel>Task Frequency</InputLabel>
        <Select
          value={state.taskScheduledFor}
          name="taskScheduledFor"
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
        >
          {commonTaskData.frequencyOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        </>)}
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add
      </Button>
    </>
  );
};
