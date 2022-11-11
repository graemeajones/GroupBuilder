import { useState, useRef, useEffect } from 'react';
import Card from '../../ui/Card';
import { Draggable, Droppable } from '../../ui/DragAndDrop';
import { dataRequest } from '../../api/dataAPI';
import Fav from './Fav';
import '../Page.scss';
import './MyLinksCard.scss';

function MyLinksCard({ GroupID, onSelect, onDismiss, isAFavourite }) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const emptyListMessage = useRef("Loading links ...");

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setSelectedProject(null); // Force immediate emptying of old table data
    fetchProjectTMP(GroupID);
  }, [GroupID]); // Run every time the selected group changes

  // Methods -------------------------------------
  const fetchProjectTMP = async () => {
    const outcome = await dataRequest('Projects/' + GroupID);
    if (outcome.success)
      setSelectedProject(outcome.response);
    else emptyListMessage.current = "Project could not be found";
  }

  // Style ---------------------------------------
  // View ----------------------------------------
  return (
    <Card className="fullWidth">
      {
        !selectedProject
          ? <p className="Tempty">Loading project ...</p>
          : <>
              <h2>{selectedProject['ProjectName']}</h2>
              <form>
                <div className="formInstructions">
                  <p>
                    Use the form below to propose students you would like to work with on 
                    the "{selectedProject['ProjectName']}" project. Although the target 
                    group size is {selectedProject['ProjectGroupsize']}, you can propose
                    any number of students. They will get an email inviting them to confirm
                    that they would like to work with you ... or decline! <span className="advice">
                    Drag names from your "Favourites" list OR from the "Search" list into
                    the dotted pane.</span>
                  </p>
                </div>
                <main className="mylinks">
                  <div className="paneFavourites">
                    <h3>Favourites</h3>
                    <div className="draggableItems">
                      <Draggable id="01" className="name">Josh GHANBARIPOUR <Fav/></Draggable>
                      <Draggable id="02" className="name">Max KENNEAVY <Fav/></Draggable>
                      <Draggable id="03" className="name">Duc NGUYEN <Fav/></Draggable>
                    </div>
                </div>
                  <div className="paneProposals">
                    <h3>Proposed members</h3>
                    <Droppable className="droppableRegion" />
                  </div>
                  <div className="paneSearch">
                    <h3>Search</h3>
                    <div className="formEntry">
                      <input defaultValue="Ahm"/>
                    </div>
                    <div className="draggableItems">
                      <Draggable id="04" className="name">Ahmed ABDULLAHI</Draggable>
                      <Draggable id="05" className="name">Sajad AHMAD</Draggable>
                      <Draggable id="06" className="name">Sarah AHMAD</Draggable>
                      <Draggable id="07" className="name">Tasveer AHMAD</Draggable>
                      <Draggable id="08" className="name">Akthar AHMED</Draggable>
                      <Draggable id="09" className="name">Daniyal AHMED</Draggable>
                      <Draggable id="10" className="name">Ahmed AMAVASEE</Draggable>
                    </div>
                  </div>
                </main>
              </form>
              <button onClick={onDismiss} className="Blue">Dismiss</button>
            </>
      }
    </Card>
  )
}

export default MyLinksCard;