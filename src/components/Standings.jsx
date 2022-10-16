import { useSelector } from "react-redux"

const Standings = () => {
    const groups = ['A','B','C','D','E','F','G','H']
    const teams = useSelector(state => state.teams)
    
    const teamRows = (list) => {
        return list
        .sort((a, b) => b.points - a.points)
        .map(team => {
            return (
            <tr key={team.id}>
                <td>
                <img key={`${team.name}-flag`} src={team.url} alt={team.name} width="35" height="20" />
                    {team.name}
                </td>
                <td>{team.games}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalsFor - team.goalsAgainst}</td>
                <td>{team.points}</td>
            </tr>
            )
        })
    }
    
    return (
        <div className='standings-container'>
            <h2 className='standings-header'>Lohkovaiheen sarjataulukot</h2>

            {groups.map(group => (
                <table className='standings-table-container'>
                    <caption>Lohko: {group}</caption>
                    <thead key='table-header' className='standings-table-header-wrapper'>
                        <tr key={'standings-table-header-row'}>
                            <th>Maa</th>
                            <th>Ottelut</th>
                            <th>Voitot</th>
                            <th>Tasapelit</th>
                            <th>Häviöt</th>
                            <th>Tehdyt maalit</th>
                            <th>Päästetyt maalit</th>
                            <th>Maaliero</th>
                            <th>Pisteet</th>
                        </tr>
                    </thead>
                    <tbody className='standings-table-tbody'>
                        {teamRows(teams.filter(team => team.group === group))}
                    </tbody>
                </table>
            ))}
        </div>
    )
}

export default Standings