import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

/** Lists all activities and lets logged-in users create new ones. */
export default function ActivitiesPage() {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loadError, setLoadError] = useState(null);

  const syncActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (e) {
      setLoadError(e.message);
    }
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      {loadError && <p role="alert">{loadError}</p>}
      <ActivityList activities={activities} />
      {token && <ActivityForm syncActivities={syncActivities} />}
    </>
  );
}
