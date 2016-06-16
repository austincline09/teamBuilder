import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, SelectFromObject, TextAreaInput, CheckboxInput } from '../../../global/components/forms';

const TeamForm = ({team, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle, users }) => {
  const buttonText = formType === "create" ? "Create Team" : "Update Team";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;
  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="teamForm" className="card team-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="teamname"
              label="Team Name: "
              value={team.teamname}
              change={handleFormChange}
              placeholder="Team Name (required)"
              required={true}
              />
              <SelectFromObject
                name="headcoach"
                objects={users}
                display={"lastName"}
                value={"_id"}
                change={handleFormChange}
                selected={team.headcoach}
                placeholder="Select Coach"
              />
            <hr/>
            <TextInput
              name="teamimage"
              label="Team Picture:"
              value={team.teamimage}
              change={handleFormChange}
              required={false}
              placeholder="Enter team image here"
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

TeamForm.propTypes = {
  team: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , users: PropTypes.array
}

export default TeamForm;
