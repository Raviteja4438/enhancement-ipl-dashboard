// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  const winColor = matchStatus === 'Won' ? 'green' : 'red'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-team-logo"
      />
      <p className="team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${winColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
