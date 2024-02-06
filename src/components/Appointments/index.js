// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    dateShow: '',
    starredButton: false,
  }
  starredButton = () => {
    this.setState(prevState => ({starredButton: !prevState.starredButton}))
  }
  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }
  addAppointment = event => {
    const {title, date} = this.state
    const newAppointment = {id: uuidv4(), title, date, isStarred: false}
    event.preventDefault()
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      dateShow: '',
    }))
  }
  changeTitle = event => {
    this.setState({title: event.target.value})
  }
  changeDate = event => {
    const date1 = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    //console.log(date)
    this.setState({date: date1, dateShow: event.target.value})
  }
  render() {
    const {appointmentsList, title, date, dateShow, starredButton} = this.state
    const showingList = starredButton ? (
      <ul className="list-container">
        {appointmentsList.map(eachItem => {
          if (eachItem.isStarred) {
            return (
              <AppointmentItem
                appointmentsList={eachItem}
                key={eachItem.id}
                toggleIsFavorite={this.toggleIsFavorite}
                data-testid="star"
              />
            )
          }
        })}
      </ul>
    ) : (
      <ul className="list-container">
        {appointmentsList.map(eachItem => (
          <AppointmentItem
            appointmentsList={eachItem}
            key={eachItem.id}
            toggleIsFavorite={this.toggleIsFavorite}
            data-testid="star"
          />
        ))}
      </ul>
    )
    return (
      <div className="background-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form>
              <label htmlFor="titleInput" className="label-element">
                TITLE
              </label>
              <br />
              <input
                type="text"
                value={title}
                className="input-title"
                id="titleInput"
                placeholder="Title"
                onChange={this.changeTitle}
              />
              <br />
              <br />
              <label htmlFor="titleDate" className="label-element">
                DATE
              </label>
              <br />
              <input
                type="date"
                value={dateShow}
                className="input-title"
                id="titleDate"
                onChange={this.changeDate}
              />
              <br />
              <br />
              <button
                type="submit"
                className="buttn"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-styles"
            />
          </div>
          <hr className="horizantal-line" />
          <div className="appointments-top">
            <h1 className="heaing-appointment">Appointments</h1>
            <button className="buttn-starred" onClick={this.starredButton}>
              Starred
            </button>
          </div>
          {showingList}
        </div>
      </div>
    )
  }
}
export default Appointments
