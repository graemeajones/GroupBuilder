import { useState, useRef } from 'react';
import MyProjectsCard from './MyProjectsCard';
import MyGroupCard from './MyGroupCard';
import MyLinksCard from './MyLinksCard';
import '../Page.scss';


function MyGroups() {
  // Properties ----------------------------------
  const InitialFavourites = [13, 24, 45, 31];
  
  // Hooks ---------------------------------------
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [favourites, setFavourites] = useState(InitialFavourites);

  const isSelectedProjectRecruiting = useRef(false);

  // Methods -------------------------------------
  const SOLICITING = 2; // PK of "Soliciting" status in Unibase Projectstatus table
  const handleProjectSelect = (id, projectStatus) => {
    isSelectedProjectRecruiting.current = (projectStatus===SOLICITING);
    setSelectedGroupID(id);
  }

  const handleFavouriteSelect = (event) => setFavourites([...favourites, parseInt(event.target.id)]);

  const dismissGroup = () => setSelectedGroupID(null);

  const isAFavourite = (id) => favourites.includes(id);

  // View ----------------------------------------
  return (
    <section>
      <h1>My Groups</h1>
      <MyProjectsCard
        selectedGroupID={selectedGroupID}
        onSelect={handleProjectSelect}
      />
      {
        selectedGroupID &&
          (
            isSelectedProjectRecruiting.current
              ?
                <MyLinksCard
                  GroupID={selectedGroupID}
                  onSelect={handleFavouriteSelect}
                  onDismiss={dismissGroup}
                  isAFavourite={isAFavourite}
                />
              :
                <MyGroupCard
                  GroupID={selectedGroupID}
                  onSelect={handleFavouriteSelect}
                  onDismiss={dismissGroup}
                  isAFavourite={isAFavourite}
              />
          )
      }
    </section>
  )
}

export default MyGroups;