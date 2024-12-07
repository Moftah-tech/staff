import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useCountriesQuery} from "../data";
import {Typography} from "@mui/material";

export const CountriesTable = () => {
    const countries = useCountriesQuery();
    return (
        <>
            <TableContainer style={{padding:20}} component={Paper}>
                <Typography>Countries</Typography>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Country Name En</TableCell>
                            <TableCell>Country Name Ar</TableCell>
                            <TableCell>Dial Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries?.data?.map((row: any) => (
                            <TableRow>
                                <TableCell>{row.labelEn}</TableCell>
                                <TableCell>{row.labelEn}</TableCell>
                                <TableCell>{row.dialCode}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}