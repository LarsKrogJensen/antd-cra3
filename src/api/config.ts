
export const API_URL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://localhost:8080/graphql"
    } else {
        return `${window.location.origin}/graphql`
    }

}
