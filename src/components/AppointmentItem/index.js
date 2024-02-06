// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentsList, toggleIsFavorite} = props
  const {id, title, date, isStarred} = appointmentsList
  const favoriteImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const favoriteButton = () => {
    toggleIsFavorite(id)
  }
  return (
    <li className="list-item-style">
      <div className="title-container-starticon">
        <p className="title-heaing}">{title}</p>
        <button
          type="button"
          onClick={favoriteButton}
          className="buttn-favorite"
          data-testid ="star"
        >
          <img src={favoriteImage} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="para-time">{`Date:${date}`}</p>
    </li>
  )
}
export default AppointmentItem
