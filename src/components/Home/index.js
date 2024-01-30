// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {iplTeams: [], isLoading: true}

  componentDidMount() {
    this.getIplTeamsList()
  }

  getIplTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const iplTeamsData = await response.json()
    const updatedIplTeamsData = iplTeamsData.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      imageUrl: eachTeam.team_image_url,
    }))

    this.setState({iplTeams: updatedIplTeamsData, isLoading: false})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={80} width={80} color="#475569" />
    </div>
  )

  renderIplTeams = () => {
    const {iplTeams} = this.state

    return (
      <ul className="ipl-teams-list-container">
        {iplTeams.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="title-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-heading">IPL DASHBOARD</h1>
          </div>
          <div>{isLoading ? this.renderLoader() : this.renderIplTeams()}</div>
        </div>
      </div>
    )
  }
}

export default Home
