import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarButton} = props
  const {id, type, date, isStarted} = appointmentDetails
  const starImageClassName = isStarted
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    toggleStarButton(id)
  }
  return (
    <li className="list-item">
      <div className="top-container">
        <p className="item-heading">{type}</p>
        <button
          type="button"
          className="item-button"
          testid="star"
          onClick={onClickStarButton}
        >
          <img className="star-image" src={starImageClassName} alt="star" />
        </button>
      </div>
      <p className="item-para">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
