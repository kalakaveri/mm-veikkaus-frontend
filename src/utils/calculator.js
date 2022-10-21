import { useSelector } from "react-redux"


export const calculatePoints = (guesses, matches) => {
    const guesses = useSelector(state => state.guesses)
    const matches = useSelector(state => state.matches)
}