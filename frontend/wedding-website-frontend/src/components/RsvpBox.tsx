import { useState } from 'react';
import './RsvpBox.css';

const RsvpBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container">
      <div
        className={`rsvp-container ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        {!isExpanded ? (
          <button onClick={handleToggle} className="expand-trigger-button">
            RSVP
          </button>
        ) : (
          <form className="rsvp-form">
            <h1>RSVP</h1>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <button type="button">Yes</button>
            <button type="button">No</button>
            <button type="button" onClick={handleToggle}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RsvpBox;
