import { Link } from "react-router";

/** Renders a list of activities, each linking to its detail page. */
export default function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
        </li>
      ))}
    </ul>
  );
}
