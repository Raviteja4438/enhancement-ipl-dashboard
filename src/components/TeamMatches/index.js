// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.getIplTeamDetails()
  }

  handleGoBack = () => {
    this.props.history.push('/')
  }

  getIplTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const updatedIplTeamDetails = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }

    console.log(updatedIplTeamDetails)
    this.setState({isLoading: false, matchesData: updatedIplTeamDetails})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="BallTriangle" height={80} width={80} color="#475569" />
    </div>
  )

  renderIplTeamDetails = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData
    return (
      <div className="ipl-team-details">
        <img src={teamBannerUrl} alt="team banner" className="team-logo" />
        <LatestMatch matchDetails={latestMatchDetails} />
        {this.renderIplTeamAllMatches()}
        {this.renderPieChart()}
        <button onClick={this.handleGoBack}>Back</button>
      </div>
    )
  }

  renderIplTeamAllMatches = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData

    return (
      <ul className="recent-matches-container">
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
        ))}
      </ul>
    )
  }

  renderPieChart = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData

    const wins = recentMatches.filter(match => match.result === 'won').length
    const losses = recentMatches.filter(match => match.result === 'lost').length
    const draws = recentMatches.filter(match => match.result === 'draw').length

    const data = [
      {name: 'Wins', value: wins},
      {name: 'Losses', value: losses},
      {name: 'Draws', value: draws},
    ]

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28']

    return (
      <div className="pie-chart-container">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="app-container">
        <div className={`app-team-matches-container ${id}`}>
          <Link to="/" onClick={this.handleGoBack}>
            Back
          </Link>
          {isLoading ? this.renderLoader() : this.renderIplTeamDetails()}
        </div>
      </div>
    )
  }
}

export default TeamMatches
