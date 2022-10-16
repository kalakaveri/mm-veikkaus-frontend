/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Team = ({ team }) => {
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const teams = useSelector(state => state.teams);

  const { teamId } = useParams()
  if (teamId || teamId !== undefined) {
    const team = teams.find(t => t.id === teamId)
  }

  const handleModify = (e) => {
    e.preventDefault();
    if (teamId) {
      navigate('modify');
    }
    else {
      navigate(`${team.id}/modify`);
    }
  };

  return (
    <li id='team-component' key={team.id}>
      <div className='team-heading'>
        <img src={team.url} alt={team.name} width="35" height="20" />
        {team.name}
        {auth.role !== 'admin'
          ? null
          : 
            <button
              className={`team-modify-button`}
              onClick={(e) => handleModify(e)}
              >Modify team
            </button>
        }
      </div>
    </li>
  );
}

export default Team