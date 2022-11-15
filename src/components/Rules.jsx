import React, { useState }  from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';

const createData = (id, rule, points) => {
    return { id, rule, points };
}

const rules = [
    createData('A', 'Ottelun lopputulos täysin oikein', '+6'),
    createData('B', 'Ottelun voittaja oikein', '+3'),
    createData('C', 'Väärä voittaja', '-4'),
    createData('D', 'Veikkaat tasapeliä ja ottelu päättyy tasan. Yksi lisäpiste, vaikka tulos ei ole oikea', '+4'),
    createData('E', 'Veikkaat tasapeliä, mutta ottelu ei pääty tasapeliin', '-2'),
    createData('F', 'Veikkaat jommankumman voittoa, mutta ottelu päättyy tasapeliin', '-2'),
    createData('G', 'Jommankumman joukkueen maalimäärä arvattu oikein', '+1'),
]

const Rules = () => {
    const [visible] = useState(true)
    // ability to easily switch component to be togglable
    // const [buttonText, setButtonText] = useState('Show rules')
    
    // const toggleVisibility = (e) => {
    //     e.preventDefault()
    //     setVisible(!visible)
    //     buttonText === 'Show rules' ? setButtonText('Hide rules') : setButtonText('Show rules')
    // }

    return (
        <Container>
            {/* <Button className='rules-button' variant='contained' onClick={toggleVisibility}>{buttonText}</Button> */}
            {visible
            ? 
                (
                <Container className='page-container'>
                    <Container align='center'>
                        <Typography color='white' variant='h6' size='medium'>MM-kisaveikkaus - säännöt</Typography>
                    </Container>
                    <Box
                        spacing={2}
                        padding={5}
                        align='center'
                        justify='left'
                        fontWeight='bold'
                        
                    >
                        <Typography color='white' variant='h6' paragraph>Tasapisteissä määräytyy parempi veikkaaja seuraavasti:</Typography>
                        <Typography color='white' variant='subtitle1' align='inherit' ml={2}>A. Enemmän täysin oikein arvattuja ottelutuloksia</Typography>
                        <Typography color='white' variant='subtitle1' align='inherit' ml={2}>B. Vähemmän väärin arvattuja otteluiden voittajia</Typography>
                        <br />
                        <br />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align='center'>
                                        <Typography variant='h6' align='center' color='white'>
                                            Kilpailun pisteet määräytyvät seuraavalla tavalla
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            #
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Selite
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Pisteansio
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='rules-table-tbody'>
                                {rules.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell><Typography variant='h6' color='white'>{row.id}</Typography></TableCell>
                                        <TableCell><Typography variant='h6' color='white'>{row.rule}</Typography></TableCell>
                                        <TableCell><Typography variant='h6' color='white'>{row.points}</Typography></TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align='center'>
                                        <Typography variant='button' align='center' color='white'>
                                            Maksimipisteet per ottelu on siis 6
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />
                        <Table sx={{ mb: 10 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align='center' background-color='white'>
                                        <Typography variant='h6' align='center' color='white'>
                                            Esimerkiksi: Arvauksesi on otteluun Suomi - Malta 2-1
                                        </Typography>
                                        </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            #
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Hypoteettinen lopputulos
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Selite
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Pisteansio
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                        A </Typography>
                                        </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            Ottelu päättyy 3-1
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            +3 oikea voittajajoukkue, +1 Maltan maalimäärä
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            +4
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='button' align='center' color='white'>
                                            B
                                        </Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Ottelu päättyy 2-2</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Veikkasit Suomen voittoa -2, Suomen maalimäärä on oikea +1</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        -1</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        C</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Ottelu päättyy 0-1</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Veikkasit Suomen voittoa -4, Maltan maalimäärä on oikea +1</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        -3</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        D</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Ottelu päättyy 1-2</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Väärä voittaja -4, ei plussapisteitä.</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        -4</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        E</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Ottelu päättyy 2-1</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        Täysin oikea arvaus, täydet pisteet.</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant='button' align='center' color='white'>
                                        +6</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Container>
                )
            : null
            }
        </Container>
    )
}

export default Rules