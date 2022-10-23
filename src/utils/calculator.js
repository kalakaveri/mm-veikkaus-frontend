import { useSelector } from "react-redux"

/**
 * Calculates the total amount points for users based on the given guesses.
 * 
 * @param {Array} guesses - Array of guesses.
 * @param {Array} matches - Array of matches.
 */
export const calculatePoints = (guesses, matches) => {
    const guesses = useSelector(state => state.guesses)
    const matches = useSelector(state => state.matches)
}