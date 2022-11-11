import { useState, useRef, useEffect } from 'react';
import Card from '../../ui/Card';
import DataTable from '../../ui/DataTable';
import TableButton from '../../ui/TableButton';
import { dataRequest } from '../../api/dataAPI';

function MyGroupCard({ GroupID, onSelect, onDismiss, isAFavourite }) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const emptyListMessage = useRef("Loading members ...");

  const [selectedProject, setSelectedProject] = useState(null);
  const [listOfMembers, setListOfMembers] = useState(null);

  useEffect(() => {
    setSelectedProject(null); // Force immediate emptying of old table data
    setListOfMembers(null);   // Force immediate emptying of old table data
    fetchProjectTMP(GroupID);
    fetchMembersTMP(GroupID);
  }, [GroupID]); // Run every time the selected group changes

  // Methods -------------------------------------
  const fetchProjectTMP = async () => {
    const outcome = await dataRequest('Projects/' + GroupID);
    if (outcome.success)
      setSelectedProject(outcome.response);
    else emptyListMessage.current = "Project could not be found";
  }

  const fetchMembersTMP = async () => {
    let tmpList = [];
    let outcome = null;
    outcome = await dataRequest('Users/' + (1 + GroupID));
    tmpList.push(outcome.response);
    outcome = await dataRequest('Users/' + (2 + GroupID));
    tmpList.push(outcome.response);
    outcome = await dataRequest('Users/' + (3 + GroupID));
    tmpList.push(outcome.response);
    outcome = await dataRequest('Users/' + (4 + GroupID));
    tmpList.push(outcome.response);
    outcome = await dataRequest('Users/' + (5 + GroupID));
    tmpList.push(outcome.response);
    if (tmpList.length > 0)
      setListOfMembers(tmpList);
    else emptyListMessage.current = "No members found";
  }

  const buildTableContent = (members) =>
    members.map((member) => {
      // Generate full name
      let fullName = member['UserLastname'] + ', ' + member['UserFirstname'];
      // Create member's JSX button
      const button = !isAFavourite(parseInt(member['UserID']))
        ? (
          <TableButton
            onClick={onSelect}
            id={member['UserID']}
            className="Green"
          >
            Add to favourites
          </TableButton>
        )
        : (<p key={member['UserID']}>Favourite</p>);
      // Compose updated project object
      return ({
        UserID: member['UserID'],
        UserFullname: fullName,
        UserEmail: member['UserEmail'],
        MemberAction: button
      });
    });
  
  // Style ---------------------------------------
  // View ----------------------------------------
  return (
    <Card className="fullWidth">
      {
        !selectedProject
          ? <p className="Tempty">Loading project ...</p>
          : <>
              <h2>{selectedProject['ProjectName']}</h2>
              <DataTable
                // An array of objects (object per row)
                objects={listOfMembers ? buildTableContent(listOfMembers) : null}
                // Key of the field to be used as ID
                idKey="UserID"
                // Table columns should contain which object fields
                fieldOrder={['UserFullname','UserEmail','MemberAction']}
                // Header titles for above columns
                headers={["Group member", "Email address", "Favourite?"]}
                // Text to display if objects is empty
                emptyMessage={emptyListMessage.current}
                // Add "containsButtons" class to row to enforce a minimum row height
                containsButtons={true}
              />
              <button onClick={onDismiss} className="Blue">Dismiss</button>
            </>
      }
    </Card>
  )
}

export default MyGroupCard;