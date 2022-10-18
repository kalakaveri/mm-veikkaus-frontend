import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"

import { createMatch } from '../reducers/matchReducer'

const AddMatch = ({ toggleVisibility }) => {
  	const teams = useSelector(state => state.teams)
  	const dispatch = useDispatch()

	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [homeTeam, setHomeTeam] = useState('')
	const [awayTeam, setAwayTeam] = useState('')

  	const handleSubmit = (e) => {
		e.preventDefault()
		const homeTeamId = teams.filter(team => team.name === homeTeam)[0].id
		const awayTeamId = teams.filter(team => team.name === awayTeam)[0].id
		const match = {
			date: date,
			time: time,
			homeTeamId: homeTeamId,
			awayTeamId: awayTeamId
		}
		dispatch(createMatch(match))
		setDate('')
		setTime('')
		setHomeTeam('')
		setAwayTeam('')
	}
  	return (
    <div className="add-match-form">
      	<h2>Add match</h2>
      	<form>
          <div>
						<div className='input-manual'>
							Syötä tiedot näkyvissä muodoissa, joukkueen nimet kirjoitetaan täsmälleen samalla tavalla kuin ne näkyvät joukkueiden listassa.
						</div>
            	<input 
								type="text" 
								name="match-date"
								placeholder="DD-MM-YYYY"
								value={date}
								onChange={({target}) => setDate(target.value)}
							/>
            	<input 
								type="text"
								name="time"
								value={time}
								placeholder="18:15"
								onChange={({target}) => setTime(target.value)}
							/>
						  	<input 
								type="text"
								name="homeTeam"
								value={homeTeam}
								placeholder="Kotijoukkue"
								onChange={({target}) => setHomeTeam(target.value)}
							/>
						  	<input 
								type="text"
								name="awayTeam"
								value={awayTeam}
								placeholder="Vierasjoukkue"
								onChange={({target}) => setAwayTeam(target.value)}
							/>
						<button className='cancel-button' type="button" onClick={toggleVisibility}>Peruuta</button>
						<button className='submit-button' type="submit" onClick={handleSubmit}>Lisää ottelu</button>
      		</div>
        </form>
    </div>
  )
}

export default AddMatch