import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatPrice } from 'utils';

export interface ProductRankingListProps {
    productList: any[]
}

export default function ProductRankingList({ productList }: ProductRankingListProps) {
    return (
        <TableContainer >
            <Table aria-label="simple table" size='small'>
                <TableHead>
                    <TableRow >
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Total price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productList.map((product, idx) => (
                        <TableRow
                            key={product._id}
                        >
                            <TableCell align='center'>
                                {idx + 1}
                            </TableCell>
                            <TableCell align="center">{product.product.title}</TableCell>
                            <TableCell align="center">{product.product.quantity}</TableCell>
                            <TableCell align="center">{formatPrice(product.product.price)}</TableCell>
                            <TableCell align="center">{formatPrice(product.product.price * product.product.quantity)}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
