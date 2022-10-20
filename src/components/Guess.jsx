import React from 'react';

const Guess = ({ guess, onGuessClick }) => {
    const [homeGoals, setHomeGoals] = React.useState(0);
    const [awayGoals, setAwayGoals] = React.useState(0);

    const handleDelete = (e) => {
        e.preventDefault();
        console.log('guess.id :>> ', guess.id);
        //dispatch(deleteGuess(guess.id));
    }

    const handleGuessUpdate = (e) => {
        e.preventDefault()

        const updatedGuess = {
          ...guess,
          homeTeamScore: homeTeamScore,
          awayTeamScore: awayTeamScore
        }
        console.log('updatedGuess :>> ', updatedGuess);
        //dispatch(updateGuess(updatedGuess))
    }


    return (
        // <TableRow sx={{ margin: '5px' }}>
        //     {/* // create input number fields, set values with useState and save values to inputid: 'match.id' + '-homeTeamScore' and 'match.id' + '-awayTeamScore' */}
            
            
        //     </TableRow>
        //     {guess}
        // </div>
        <div></div>
        )
    }