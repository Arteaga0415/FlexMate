import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'

export const MuiTable = () => {
  return (
    <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
      <Table stickyHeader aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell align='center'>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell align='center'>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const tableData = [
  {
    id: 1,
    first_name: 'Beret',
    last_name: 'Lennard',
    email: 'blennard0@pcworld.com',
    gender: 'Female',
    ip_address: '213.196.192.52'
  },
  {
    id: 2,
    first_name: 'Tera',
    last_name: 'Choke',
    email: 'tchoke1@theatlantic.com',
    gender: 'Male',
    ip_address: '101.152.241.70'
  },
]