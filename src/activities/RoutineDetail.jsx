import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getRoutineById, deleteRoutine, addSetToRoutine, deleteSet } from "../api/routines";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

/** Detail page for a single routine. Shows info, sets, and forms for logged-in users. */
export default function RoutineDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [routine, setRoutine] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [deleteRoutineError, setDeleteRoutineError] = useState(null);
  const [deleteSetError, setDeleteSetError] = useState(null);
  const [setFormError, setSetFormError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [routineData, activityData] = await Promise.all([
          getRoutineById(id),
          getActivities(),
        ]);
        setRoutine(routineData);
        setActivities(activityData);
      } catch (e) {
        setLoadError(e.message);
      }
    }
    load();
  }, [id]);

  const refreshRoutine = async () => {
    const updated = await getRoutineById(id);
    setRoutine(updated);
  };

  const tryDeleteRoutine = async () => {
    setDeleteRoutineError(null);
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setDeleteRoutineError(e.message);
    }
  };

  const tryAddSet = async (formData) => {
    setSetFormError(null);
    const activityId = +formData.get("activityId");
    const count = +formData.get("count");
    try {
      await addSetToRoutine(token, id, { activityId, count, duration: 0 });
      await refreshRoutine();
    } catch (e) {
      setSetFormError(e.message);
    }
  };

  const tryDeleteSet = async (setId) => {
    setDeleteSetError(null);
    try {
      await deleteSet(token, setId);
      await refreshRoutine();
    } catch (e) {
      setDeleteSetError(e.message);
    }
  };

  if (!routine && !loadError) return <p>Loading...</p>;
  if (loadError) return <p role="alert">{loadError}</p>;

  const sets = routine.activities ?? [];

  return (
    <>
      <Link to="/routines">← Back to routines</Link>

      <h1>{routine.name}</h1>
      <p><strong>Goal:</strong> {routine.goal}</p>
      <p><strong>Created by:</strong> {routine.creator?.username ?? "Unknown"}</p>

      {token && <button onClick={tryDeleteRoutine}>Delete routine</button>}
      {deleteRoutineError && <p role="alert">{deleteRoutineError}</p>}

      <h2>Sets</h2>
      {sets.length === 0 ? (
        <p>No sets yet — add one below to get started!</p>
      ) : (
        <ul>
          {sets.map((set) => (
            <li key={set.id}>
              {set.activity?.name ?? "Unknown activity"} — {set.count} reps
              {token && (
                <button onClick={() => tryDeleteSet(set.id)}>Remove</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {deleteSetError && <p role="alert">{deleteSetError}</p>}

      {token && (
        <>
          <h2>Add a set</h2>
          <form action={tryAddSet}>
            <label>
              Activity
              <select name="activityId" required>
                <option value="">Select an activity</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Reps
              <input type="number" name="count" min="1" required />
            </label>
            <button>Add set</button>
          </form>
          {setFormError && <p role="alert">{setFormError}</p>}
        </>
      )}
    </>
  );
}
