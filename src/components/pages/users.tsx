import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useUsersQuery} from "../data";
import {Typography} from "@mui/material";


export const UsersTable = () => {
    const users = useUsersQuery();

    return (
        <>
        <TableContainer style={{padding:30}} component={Paper}>
            <Typography>Users</Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell align="right">Full Name in Arabic</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.data?.map((row: any) => (
                        <TableRow
                            key={row.firstName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {`${row.firstName} ${row.lastName}`}
                            </TableCell>
                            <TableCell align="right">{`${row.firstNameAr} ${row.lastNameAr}`}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.phoneNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}