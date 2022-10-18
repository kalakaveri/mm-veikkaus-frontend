import React from 'react';
import { useSelector } from 'react-redux'

const Points = () => {
    const users = useSelector(state => state.users)

    const sortUsers = (x) => {
        return x.sort((a, b) => b.points - a.points)
    }
    return (
        <div className='points-container'>
            <div className='points-table-container'>
                <table className='points-table'>
                    <caption>Pistetaulukko</caption>
                    <thead className='points-table-thead'>
                        <tr>
                            <th>Sija</th>
                            <th>Nimi</th>
                            <th>Pisteet</th>
                        </tr>
                    </thead>
                    <tbody className='points-table-tbody'>
                        {sortUsers(users).map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Points