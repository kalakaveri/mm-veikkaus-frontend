import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createGuess, initGuesses } from "../reducers/guessReducer"
import { useEffect } from "react"

import GuessModifier from "./GuessModifier"

const GuessPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const guesses = useSelector(state => state.guesses)
  const matches = useSelector(state => state.matches)

  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  useEffect(() => {
    dispatch(initGuesses())
  }, [])

  const submitGuesses = () => {
    const table = document.getElementsByClassName('guessPage-table-tbody')[0]
    const rows = table.getElementsByTagName('tr')
    const modifiedGuesses = []
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const matchId = row.cells[0].innerText
      const homeTeamScore = row.getElementsByClassName('homeTeamScore')[0]
      const awayTeamScore = row.getElementsByClassName('awayTeamScore')[0]
      if (homeTeamScore.defaultValue !== homeTeamScore.value
        && awayTeamScore.defaultValue !== awayTeamScore.value) {
          const userId = user.id
          
          const newGuess = {
            matchId: matchId,
            userId: userId,
            homeTeamScore: homeTeamScore.value,
            awayTeamScore: awayTeamScore.value,
          }
          modifiedGuesses.push(newGuess)
      }
    }
    console.log('@GuessPage:: ', modifiedGuesses)
    modifiedGuesses.forEach(guess => {
      dispatch(createGuess(guess))
      console.log('guess @GuessPage loop :>> ', guess);
    })
  }

  return (
    <div className='guessPage-container'>
      <button className='cancel-button' type='button' onClick={toggleVisibility}>{visible ? 'Peruuta muutokset' : 'Muokkaa arvauksia'}</button>
      {visible 
        ? (<div>{guesses.filter(guess => guess.user.id === user.id).map(g => (<GuessModifier key={g.id} guess={g} />))}</div>)
        : (<div>
          <table className="guessPage-table-container">
          <caption>Syötä veikkaukset</caption>
            <thead>
              <tr key='header'>
                <th hidden />
                <th>Päivämäärä</th>
                <th>Aika</th>
                <th colSpan="2">Kotijoukkue</th>
                <th colSpan="2">Vierasjoukkue</th>
              </tr>
            </thead>
            <tbody key='table-body' className='guessPage-table-tbody'>
              {matches && matches.length > 0
                ? matches.map(match => (
                  user.guesses.find(guess => guess.matchId === match.id) === undefined
                    ?
                      (<tr key={match.id}>
                        <td className='matchId' hidden>{match.id}</td>
                        <td>{match.date}</td>
                        <td>{match.time}</td>
                        <td><img src={match.homeTeam.url} alt='' width={'35px'} height={'20px'} />{match.homeTeam.name}</td>
                        <td><input className='homeTeamScore' type="number" min={0} max={20} defaultValue={null}/></td>
                        <td><input className='awayTeamScore' type="number" min={0} max={20} defaultValue={null} /></td>
                        <td>{match.awayTeam.name}<img src={match.awayTeam.url} alt='' width={'35px'} height={'20px'} /></td>
                      </tr>)
                    : null
                ))
                : <tr key='no-matches'><td>Olet jo syöttänyt arvaukset</td></tr>
              }
            </tbody>
          </table>
          <button type='submit' onClick={submitGuesses}>Lähetä veikkaukset</button>
          </div>)
      }
    </div>
  )
}

export default GuessPage