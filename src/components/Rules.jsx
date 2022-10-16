//import { useState } from "react"

const Rules = () => {
    // ability to easily switch component to be togglable

    //const [visible, setVisible] = useState(true)
    //const [buttonText, setButtonText] = useState('Show rules')

    // const toggleVisibility = (e) => {
    //     e.preventDefault()
    //     setVisible(!visible)
    //     buttonText === 'Show rules' ? setButtonText('Hide rules') : setButtonText('Show rules')
    // }

    const visible = true

    return (
        <div className="rules-container">
            {/* <button id='rules-button' onClick={toggleVisibility}>{buttonText}</button> */}
            {visible
            ? 
                (
                <div className='rules-wrapper'>
                    <h2 className='rules-header'>Kilpailun säännöt</h2>
                        <p>Mikäli useampi arvaaja päätyy tasapisteisiin, parempi arvaaja määräytyy seuraavassa järjestyksessä:</p>
                        <ol>
                            <li>Enemmän täysin oikein arvattuja ottelutuloksia</li>
                            <li>Vähemmän väärin arvattuja ottelun voittajia</li>
                        </ol>
                        <table className='rules-table-container'>
                            <caption>Kilpailun pisteet määräytyvät seuraavalla tavalla:</caption>
                            <thead className='rules-table-thead'>
                                <tr><th>#</th><th>Selite</th><th>Pisteansio</th></tr>
                            </thead>
                            <tbody className='rules-table-tbody'>
                                <tr><td>A.</td><td>Ottelun lopputulos täysin oikein</td><td>+6</td></tr>
                                <tr><td>B.</td><td>Ottelun voittaja oikein</td><td>+3</td></tr>
                                <tr><td>C.</td><td>Väärä voittaja</td><td>-4</td></tr>
                                <tr><td>D.</td><td>Veikkaat tasapeliä ja ottelu päättyy tasan. Yksi lisäpiste, vaikka tulos ei ole oikea</td><td>+4</td></tr>
                                <tr><td>E.</td><td>Veikkaat tasapeliä, mutta ottelu ei pääty tasapeliin</td><td>-2</td></tr>
                                <tr><td>F.</td><td>Veikkaat jommankumman voittoa, mutta ottelu päättyy tasapeliin</td><td>-2</td></tr>
                                <tr><td>G.</td><td>Jommankumman joukkueen maalimäärä arvattu oikein</td><td>+1</td></tr>
                            </tbody>
                        </table>
                        <p>Maksimipisteet per ottelu on siis 6.</p>
                        <br />
                        <h3>Esimerkiksi:</h3>
                        <p>Arvauksesi on otteluun Suomi - Malta  4-3</p>
                        <ol>
                            <li>A. Ottelu päättyy 3-1, saat +4 pistettä. - +3 oikea voittajajoukkue, +1 Maltan maalimäärä)</li>
                            <li>B. Ottelu päättyy 2-2, saat -1 pistettä, - Veikkasit Suomen voittoa -2, Suomen maalimäärä on oikea +1</li>
                            <li>C. Ottelu päättyy 0-1, saat -3 pistettä. - Väärä voittaja -4, sekä Maltan maalimäärä +1</li>
                            <li>D. Ottelu päättyy 1-2, saat -4 pistettä. - Väärä voittaja -4, ei plussapisteitä.</li>
                            <li>E. Ottelu päättyy 2-1, saat +6 pistettä. - Täysin oikea arvaus, täydet pisteet.</li>
                        </ol>
                        <br />
                        <h3>Veikkauksen voittaja on EHDOTON MM-jalkapallotietäjä seuraaviin kisoihin saakka.</h3>
                </div>
                )
            : null
                }
        </div>
    )
}

export default Rules