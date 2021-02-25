import history from "./history"

export const errorHandler = (e: Error) => {
    if (e.message === 'expired token' || e.message === 'invalid token' || e.message === 'no token') {
        return history.push('/login')
    }
}