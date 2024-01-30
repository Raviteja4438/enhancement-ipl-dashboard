// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, imageUrl} = teamDetails

  return (
    <Link className="link-item" to={`/team-matches/${id}`}>
      <li className="ipl-team">
        <img src={imageUrl} alt={name} className="ipl-team-logo" />
        <p className="ipl-team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
