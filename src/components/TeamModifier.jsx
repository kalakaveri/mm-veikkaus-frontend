import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { updateTeam } from "../reducers/teamReducer"

const TeamModifier = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { teamId } = useParams()
  const team = useSelector(state => state.teams.find(t => t.id === teamId))

  const [games, setGames] = useState(team.games)
  const [wins, setWins] = useState(team.wins)
  const [draws, setDraws] = useState(team.draws)
  const [losses, setLosses] = useState(team.losses)
  const [goalsFor, setGoalsFor] = useState(team.goalsFor)
  const [goalsAgainst, setGoalsAgainst] = useState(team.goalsAgainst)
  const [points, setPoints] = useState(team.points)

  const handleModify = (e) => {
    e.preventDefault()

    let teamData = team

    if (games !== team.games) { teamData = { ...teamData, games: games } }
    if (wins !== team.wins) { teamData = { ...teamData, wins: wins }}
    if (draws !== team.draws) { teamData = { ...teamData, draws: draws }}
    if (losses !== team.losses) { teamData = { ...teamData, losses: losses }}
    if (goalsFor !== team.goalsFor) { teamData = { ...teamData, goalsFor: goalsFor }}
    if (goalsAgainst !== team.goalsAgainst) { teamData = { ...teamData, goalsAgainst: goalsAgainst }}
    if (points !== team.points) { teamData = { ...teamData, points: points } }
    teamData = { ...teamData, goaldifference: goalsFor - goalsAgainst }

    if (!(wins + draws + losses) === games) {
      alert("Games played must equal wins + draws + losses")
    }
    if (!points === ((wins * 3) + draws)) {
      alert("Points must equal (wins * 3) + draws")
    }
    else {
      dispatch(updateTeam(teamData))
      navigate(`/teams`)
    }
  }

  return (
    <div className='teamModifier-container'>
      <h2 className='teamModifier-header'>Team Modifier</h2>
      <form className='teamModifier-form'>
        <div className='teamModifier-form-group'>
          <div className='teamModifier-name-header'>
            <img src={team.url} alt={team.name} width="35" height="20" />
            {team.name}
          </div>
          <label htmlFor="team-games">Ottelut</label>
          <input className='teamModifier-games-input' type='number' name='team-games' value={games} 
            onChange={({target}) => setGames(target.value)} min={0} max={25} />
          <label htmlFor="team-wins">Voitot</label>
          <input className='teamModifier-wins-input' type='number' name='team-wins' value={wins} 
            onChange={({target}) => setWins(target.value)} min={0} max={25} />
          <label htmlFor="team-draws">Tasapelit</label>
          <input className='teamModifier-draws-input' type='number' name='team-draws' value={draws}
            onChange={({target}) => setDraws(target.value)} min={0} max={25} />
          <label htmlFor="team-losses">Häviöt</label>
          <input className='teamModifier-losses-input' type='number' name='team-losses' value={losses}
            onChange={({target}) => setLosses(target.value)} min={0} max={25} />
          <label htmlFor="team-goalsFor">Tehdyt maalit</label>
          <input className='teamModifier-goalsFor-input' type='number' name='team-goalsFor' value={goalsFor}
            onChange={({target}) => setGoalsFor(target.value)} min={0} max={55} />
          <label htmlFor="team-goalsAgainst">Päästetyt maalit</label>
          <input className='teamModifier-goalsAgainst-input' type='number' name='team-goalsAgainst' value={goalsAgainst}
            onChange={({target}) => setGoalsAgainst(target.value)} min={0} max={55} />
          <label htmlFor="team-points">Pisteet</label>
          <input className='teamModifier-points-input' type='number' name='team-points' value={points}
            onChange={({target}) => setPoints(target.value)} min={0} max={55} />
        </div>
        <button className='teamModifier-cancel-button' onClick={(e) => navigate('/teams')}>Cancel</button>
        <button className='teamModifier-submit-button' onClick={(e) => handleModify(e)}>Modify team</button>
      </form>
    </div>
  )
}

export default TeamModifier