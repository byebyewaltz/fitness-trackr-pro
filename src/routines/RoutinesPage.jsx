import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getRoutines, createRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

/** Lists all routines and lets logged-in users create new ones. */
export default function RoutinesPage() {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [formError, setFormError] = useState(null);

  const syncRoutines = async () => {
    try {
      const data = await getRoutines();
      setRoutines(data);
    } catch (e) {
      setLoadError(e.message);
    }
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  const tryCreateRoutine = async (formData) => {
    setFormError(null);
    const name = formData.get("name");
    const goal = formData.get("goal");
    try {
      await createRoutine(token, { name, goal });
      syncRoutines();
    } catch (e) {
      setFormError(e.message);
    }
  };

  return (
    <>
      <h1>Routines</h1>

      {loadError && <p role="alert">{loadError}</p>}

      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
          </li>
        ))}
      </ul>

      {token && (
        <>
          <h2>Create a new routine</h2>
          <form action={tryCreateRoutine}>
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Goal
              <input type="text" name="goal" required />
            </label>
            <button>Create routine</button>
          </form>
          {formError && <p role="alert">{formError}</p>}
        </>
      )}
    </>
  );
}
