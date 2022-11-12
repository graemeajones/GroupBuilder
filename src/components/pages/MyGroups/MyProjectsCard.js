import { useState, useEffect } from 'react';
import Card from '../../ui/Card';
import DataTable from '../../ui/DataTable';
import TableButton from '../../ui/TableButton';
import { dataRequest } from '../../api/dataAPI';


function MyProjectsCard({selectedGroupID,onSelect}) {
  // Properties ----------------------------------

  // Hooks ---------------------------------------
  const [listOfProjects, setListOfProjects] = useState(null);
  const [emptyListMessage, setEmptyListMessage] = useState("Loading projects ...");

  useEffect(() => { fetchProjects() }, [selectedGroupID]); // Run everytime selected group changes

  // Methods -------------------------------------
  const fetchProjects = async () => {
    const outcome = await dataRequest('Projects');
    if ( outcome.success && (outcome.response.length > 0) )
         setListOfProjects(outcome.response);
    else setEmptyListMessage("No projects could be found");
  }

  const buildProjectStatusSpan = (status) =>
    status === 1 ? <span className="Negative">Pending</span>
      : status === 2 ? <span className="Neutral">Soliciting</span>
        : status === 3 ? <span className="Positive">Running</span>
          : status === 4 ? <span className="Positive">Paused</span>
            : status === 5 ? <span className="Negative">Completed</span>
              : status === 6 ? <span className="Negative">Terminated</span>
                : "Undefined";

  const buildTableContent = (projects, selectedID) => 
    projects.map((project) => {
      // Create project information
      const projName = (<span>{project['ProjectName']}<br /><span className="Muted">{project['ProjectModule']}</span></span>);
      // Modify ProjectStart field
      const projStart = new Date(project['ProjectStartdate']);
      // Build a ProjectStatus field
      const projStatus = buildProjectStatusSpan(parseInt(project['ProjectProjectstatusID']));
      // Create project's JSX button
      const projButton = (selectedID !== parseInt(project['ProjectID']))
        ? (
          <TableButton
            onClick={handleSelect}
            id={project['ProjectID']}
            className="Yellow"
          >
            View
          </TableButton>
        )
        : (<p>See below</p>);
      // Compose updated project object
      return ({
          ProjectInfo:   projName,
          ProjectStart:  projStart.toDateString(),
          ProjectStatus: projStatus,
          ProjectAction: projButton
        });
    });
  
  // Recover the 'id' (not index) and 'status' of clicked project and pass to onSelect
  const handleSelect = (event) => {
    const id = parseInt(event.target.id);
    const index = listOfProjects.findIndex( (project) => id===parseInt(project['ProjectID']) );
    const status = parseInt(listOfProjects[index]['ProjectProjectstatusID']);
    onSelect( id, status );
  }

  // View ----------------------------------------
  return (
    <Card className="fullWidth">
      <h2>My Projects</h2>
      <DataTable
        // An array of objects (object per row)
        objects={listOfProjects ? buildTableContent(listOfProjects, selectedGroupID) : null}
        // Key of the field to be used as ID
        idKey="ProjectID"
        // Table columns should contain which object fields; defines number of table columns
        fieldOrder={['ProjectInfo', 'ProjectStatus', 'ProjectStart', 'ProjectAction']}
        // Header titles for above columns
        headers={["Project Name", "Project Status", "Project Start", "Operation"]}
        // Text to display if objects is empty
        emptyMessage={emptyListMessage}
        // Add "containsButtons" class to every row to enforce a minimum row height
        containsButtons={true}
      />
    </Card>
  )
}

export default MyProjectsCard;