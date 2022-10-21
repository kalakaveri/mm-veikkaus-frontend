import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router';

import Auth from './components/Auth';
import Finder from './components/Finder';
import Footer from './components/Footer'
import Homepage from './components/Homepage'
import GuessModifier from './components/GuessModifier';
import GuessPage from './components/GuessPage';
import LoginForm from './components/LoginForm'
import Match from './components/Match';
import MatchModifier from './components/MatchModifier';
import MatchPage from './components/MatchPage';
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Notification from './components/Notification'
import Points from './components/Points';
import Register from './components/Register'
import Standings from './components/Standings';
import Team from './components/Team';
import TeamModifier from './components/TeamModifier';
import TeamsPage from './components/TeamsPage';
import UsersPage from './components/UsersPage';
import User from './components/User';
import UserModifier from './components/UserModifier';

import { initUser } from './reducers/authReducer'
import { initGuesses, getGuess } from './reducers/guessReducer';
import { initMatches, getMatch } from './reducers/matchReducer';
import { initTeams, getTeam } from './reducers/teamReducer';
import { getAll, getUser } from './reducers/usersReducer';

import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const users = useSelector(state => state.users)
  
  useEffect (() => {
    if (user === null) {
      dispatch(initUser());
    }
    if (!users || users.length === 0) {
      dispatch(initTeams());
      dispatch(initMatches());
      dispatch(initGuesses());
      dispatch(getAll());
    }
  }
  , [dispatch, user, users]);
  
  
  return (
    <Container className='app-container'>
      <div className='background'></div>
      <Navbar />
      <Notification />
      
      <Routes>
        <Route path='/' index element={<Homepage />} />
        <Route element={<Auth authRoles={['guest']} />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginForm />} />
        </Route>

        <Route element={<Auth authRoles={['guest', 'guesser', 'admin']} />}>
          <Route path='/points' element={<Points />} />
          <Route path='/standings' element={<Standings />} />
          <Route path='/matches' element={<MatchPage />} />
          <Route path='/matches/:matchId' element={<Finder type='match' findHandler={getMatch} />} />
            <Route index element={<Match />} />
            <Route path='/matches/:matchId/modify' element={<MatchModifier />} />
        </Route>

        <Route element={<Auth authRoles={['admin']} />}>
          <Route path='/teams' element={<TeamsPage />} />
          <Route path='/teams/:teamId' element={<Finder type='team' findHandler={getTeam} />} />
            <Route index element={<Team />} />
            <Route path='/teams/:teamId/modify' element={<TeamModifier />} />
        </Route>

        <Route element={<Auth authRoles={['admin', 'guesser']} />}>
          <Route path='/guesses' element={<GuessPage />} />
          <Route path='/guesses/:guessId' element={<Finder type='guess' findHandler={getGuess} />} />
            <Route index element={<GuessModifier />} />
        </Route>

        <Route element={<Auth authRoles={['admin']} />}>
          <Route path='/users' element={<UsersPage />} />
          <Route path='/users/:userId' element={<Finder type='user' findHandler={getUser} />} />
            <Route index element={<User />} />
            <Route path='/users/:userId/modify' element={<UserModifier />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App