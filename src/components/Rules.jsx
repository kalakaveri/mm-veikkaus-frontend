import React, { useState }  from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';

/* <ol>
<li>A. Ottelu päättyy 3-1, saat +4 pistettä. - +3 oikea voittajajoukkue, +1 Maltan maalimäärä)</li>
<li>B. Ottelu päättyy 2-2, saat -1 pistettä, - Veikkasit Suomen voittoa -2, Suomen maalimäärä on oikea +1</li>
<li>C. Ottelu päättyy 0-1, saat -3 pistettä. - Väärä voittaja -4, sekä Maltan maalimäärä +1</li>
<li>D. Ottelu päättyy 1-2, saat -4 pistettä. - Väärä voittaja -4, ei plussapisteitä.</li>
<li>E. Ottelu päättyy 2-1, saat +6 pistettä. - Täysin oikea arvaus, täydet pisteet.</li>
</ol>
<br /> */

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
        <Container className="rules-container" sx={{ mt: 10 }}>
            {/* <Button className='rules-button' variant='contained' onClick={toggleVisibility}>{buttonText}</Button> */}
            {visible
            ? 
                (
                <>
                    <Container align='center'>
                        <Typography className='homepage-header' variant='button' size='large' sx={{ mt: 5, mb: 5 }}>MM-kisaveikkaus</Typography>
                        <br />
                        <Typography className='rules-header' variant='h5'>Kilpailun säännöt</Typography>
                    </Container>
                    <Box
                        className='rules-wrapper'
                        spacing={2}
                        padding={5}
                        align='center'
                        justify='left'
                        fontWeight='bold'
                    >
                        <Typography variant='h6' paragraph>Tasapisteissä määräytyy parempi veikkaaja seuraavasti:</Typography>
                        <Typography variant='subtitle1' align='inherit' ml={2}>A. Enemmän täysin oikein arvattuja ottelutuloksia</Typography>
                        <Typography variant='subtitle1' align='inherit' ml={2}>B. Vähemmän väärin arvattuja otteluiden voittajia</Typography>
                        <br />
                        <br />
                        <Table className='rules-table-container'>
                            <TableHead className='rules-table-TableCellead'>
                                <TableRow>
                                    <TableCell colSpan={3} align='center' background-color='white'>
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
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.rule}</TableCell>
                                        <TableCell>{row.points}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align='center' background-color='white'>
                                        <Typography variant='button' align='center' color='black'>
                                            Maksimipisteet per ottelu on siis 6
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />
                        <Typography variant='h5'>Esimerkiksi:</Typography>
                        <Typography variant='button' paragraph>Arvauksesi on otteluun Suomi - Malta 2-1</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align='center' background-color='white'>
                                        <Typography variant='h6' align='center' color='white'>
                                            Arvauksesi on otteluun Suomi - Malta 2-1
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
                                    A 
                                    </TableCell>
                                    <TableCell>
                                        Ottelu päättyy 3-1
                                    </TableCell>
                                    <TableCell>
                                        +3 oikea voittajajoukkue, +1 Maltan maalimäärä
                                    </TableCell>
                                    <TableCell>
                                        +4
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        B
                                    </TableCell>
                                    <TableCell>
                                        Ottelu päättyy 2-2
                                    </TableCell>
                                    <TableCell>
                                        Veikkasit Suomen voittoa -2, Suomen maalimäärä on oikea +1
                                    </TableCell>
                                    <TableCell>
                                        -1
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        C
                                    </TableCell>
                                    <TableCell>
                                        Ottelu päättyy 1-1
                                    </TableCell>
                                    <TableCell>
                                        Veikkasit Suomen voittoa -2, Suomen maalimäärä on väärä
                                    </TableCell>
                                    <TableCell>
                                        -2
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        D
                                    </TableCell>
                                    <TableCell>
                                        Ottelu päättyy 1-2
                                    </TableCell>
                                    <TableCell>
                                        Väärä voittaja -4, ei plussapisteitä.
                                    </TableCell>
                                    <TableCell>
                                        -4
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        E
                                    </TableCell>
                                    <TableCell>
                                        Ottelu päättyy 2-1
                                    </TableCell>
                                    <TableCell>
                                        Täysin oikea arvaus, täydet pisteet.
                                    </TableCell>
                                    <TableCell>
                                        +6
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </>
                )
            : null
            }
        </Container>
    )
}

export default Rules