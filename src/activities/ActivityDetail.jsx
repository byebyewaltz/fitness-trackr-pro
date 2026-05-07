import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getActivityById, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

/** Shows full details for a single activity, with a delete option for logged-in users. */
export default function ActivityDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await getActivityById(id);
        setActivity(data);
      } catch (e) {
        setLoadError(e.message);
      }
    }
    loadActivity();
  }, [id]);

  const tryDelete = async () => {
    setDeleteError(null);
    try {
      await deleteActivity(token, id);
      navigate("/");
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  if (!activity && !loadError) return <p>Loading...</p>;
  if (loadError) return <p role="alert">{loadError}</p>;

  return (
    <>
      <Link to="/">← Back to activities</Link>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p><strong>Created by:</strong> {activity.creator?.username ?? "Unknown"}</p>
      {deleteError && <p role="alert">{deleteError}</p>}
      {token && <button onClick={tryDelete}>Delete activity</button>}
    </>
  );
}
