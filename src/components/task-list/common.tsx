import type { TableRowProps_ } from "./types";
import { TableCell, TableRow, Chip} from "@mui/material";

export const RenderTableRow : React.FC<TableRowProps_> = ({task}) => {
  const { 
      taskId = "", 
      taskName = "", 
      taskDetails = "", 
      taskDescription = "", 
      taskStatus = "", 
      taskScheduled = ""
  } = task;
    return(
        <TableRow key={taskId} hover>
            <TableCell>{taskId}</TableCell>
            <TableCell>{taskName}</TableCell>
            <TableCell>{taskDetails}</TableCell>
            <TableCell>{taskDescription}</TableCell>
            <TableCell>
                <Chip
                    label={taskStatus}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: "6px" }}
                />
            </TableCell>
            <TableCell>{taskScheduled}</TableCell>
        </TableRow>
    )
}