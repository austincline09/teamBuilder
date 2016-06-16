import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, TextAreaInput, SelectFromObject, CheckboxInput } from '../../../global/components/forms';

const PlayerForm = ({player, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle, teams }) => {
  const buttonText = formType === "create" ? "Create Player" : "Update Player";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;
  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="productForm" className="card product-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="firstname"
              label="First Name"
              value={player.firstname}
              change={handleFormChange}
              placeholder="First Name (required)"
              required={true}
              />
            <TextInput
              name="lastname"
              label="Last Name"
              value={player.lastname}
              change={handleFormChange}
              required={false}
              placeholder="Last Name"
              />
              <SelectFromObject
                name="team"
                objects={teams}
                display={"teamname"}
                value={"_id"}
                change={handleFormChange}
                selected={player.team}
                placeholder="Select Team"
              />
            <TextInput
              name="playernumber"
              label="Player Number:"
              value={player.playernumber}
              change={handleFormChange}
              placeholder="Enter Jersey Number Here"
              required={false}
              />
              <TextInput
                name="playerimage"
                label="Player Picture:"
                value={player.playerimage}
                change={handleFormChange}
                required={false}
                placeholder="Enter player image here"
                />
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={cancelLink}>Cancel</Link>
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

PlayerForm.propTypes = {
  player: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , teams: PropTypes.array
}

export default PlayerForm;
