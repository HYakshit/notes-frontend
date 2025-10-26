import { Link } from 'react-router-dom'

export const LinkComponent = ({ to, id,children ,classlist}) => {
    return (
        <Link to={to} id={id} className={`link-custom px-6 py-3 rounded-xl ${classlist}`}>
            {children}
        </Link>
    )
}
