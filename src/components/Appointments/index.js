import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    typeInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleStarButton = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarted: !eachAppointment.isStarted}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  onSubmitAppointmentForm = event => {
    event.preventDefault()
    const {typeInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuid(),
      type: typeInput,
      date: formattedDate,
      isStarted: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      typeInput: '',
      dateInput: '',
    }))
  }

  getListToBeRendered = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarted === true,
      )
    }
    return appointmentsList
  }

  getInputValue = event => {
    this.setState({typeInput: event.target.value})
  }

  getDateValue = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {typeInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const listToBeRendered = this.getListToBeRendered()
    return (
      <div className="bg-container">
        <div className="white-container">
          <div className="content-container">
            <div className="appointment-container">
              <form onSubmit={this.onSubmitAppointmentForm} className="form">
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="doctor">TITLE</label>
                <input
                  className="text-input"
                  id="doctor"
                  type="text"
                  value={typeInput}
                  onChange={this.getInputValue}
                />
                <label htmlFor="date">DATE</label>
                <input
                  className="date-input"
                  id="date"
                  type="date"
                  value={dateInput}
                  onChange={this.getDateValue}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                className="appointments-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="h-row" />
          <div className="bottom-heading-filter">
            <h1 className="list-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <div className="bottom-list-container">
            <ul className="ul-style">
              {listToBeRendered.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleStarButton={this.toggleStarButton}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
