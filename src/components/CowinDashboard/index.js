import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, coWinData: {}}

  componentDidMount() {
    this.getVacineData()
  }

  getVacineData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDayData => ({
          vaccineDate: eachDayData.vaccine_date,
          dose1: eachDayData.dose_1,
          dose2: eachDayData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(genderType => ({
          gender: genderType.gender,
          count: genderType.count,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        coWinData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {coWinData} = this.state
    return (
      <div>
        <div className="graph-card">
          <h1 className="sub-heading">Vaccination Coverage</h1>
          <VaccinationCoverage data={coWinData.last7DaysVaccination} />
        </div>
        <div className="graph-card">
          <h1 className="sub-heading">Vaccination by gender</h1>
          <VaccinationByGender data={coWinData.vaccinationByGender} />
        </div>
        <div className="graph-card">
          <h1 className="sub-heading">Vaccination by Age</h1>
          <VaccinationByAge data={coWinData.vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="loading-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-description">Something went wrong</h1>
    </div>
  )

  renderInProgressView = () => (
    <div className="loading-container">
      <Loader
        type="ThreeDots"
        color="white"
        height="50"
        width="50"
        data-testid="loader"
      />
    </div>
  )

  renderPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="header-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="page-logo"
          />
          <h1 className="page-title">Co-WIN</h1>
        </div>
        <h1 className="sub-heading">CoWIN Vaccination in India</h1>
        {this.renderPage()}
      </div>
    )
  }
}

export default CowinDashboard
