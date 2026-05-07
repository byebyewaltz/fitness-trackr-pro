const API = import.meta.env.VITE_API;

/** Fetches all routines from the API. */
export async function getRoutines() {
  const response = await fetch(API + "/routines");
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/** Fetches a single routine by ID. */
export async function getRoutineById(id) {
  const response = await fetch(API + "/routines/" + id);
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/** Creates a new routine. Requires a valid token. */
export async function createRoutine(token, routine) {
  if (!token) throw Error("You must be signed in to create a routine.");
  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/** Deletes a routine by ID. Requires a valid token. */
export async function deleteRoutine(token, id) {
  if (!token) throw Error("You must be signed in to delete a routine.");
  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
}

/** Adds a set (activity) to a routine. Requires a valid token. */
export async function addSetToRoutine(token, routineId, set) {
  if (!token) throw Error("You must be signed in to add a set.");
  const response = await fetch(API + "/routines/" + routineId + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/** Deletes a set (routine_activity) by its ID. Requires a valid token. */
export async function deleteSet(token, setId) {
  if (!token) throw Error("You must be signed in to delete a set.");
  const response = await fetch(API + "/routine_activities/" + setId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
}