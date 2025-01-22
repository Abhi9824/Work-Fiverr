import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { filteredTaskAsync } from "../../features/taskSlice";
import { getAllTagsAsync } from "../../features/tagsSlice";
const { calculateDueDate } = require("../../utils/dateFormat");

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  // Redux state
  const { tasks } = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);

  // Local state
  const [owner, setOwner] = useState([]);
  const [tag, setTag] = useState("");

  // Fetch tags on component mount
  useEffect(() => {
    dispatch(getAllTagsAsync());
  }, [dispatch]);

  // Fetch tasks with filters
  useEffect(() => {
    const filters = { projectId, owner, tag };
    dispatch(filteredTaskAsync(filters));
  }, [dispatch, projectId, owner, tag]);

  // Handle owner checkbox changes
  const ownerHandler = (e) => {
    const { value, checked } = e.target;
    setOwner((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  // Handle tag dropdown changes
  const tagHandler = (e) => {
    setTag(e.target.value);
  };

  return (
    <div className="body">
      <div className="layout">
        <Sidebar />
        <div className="content">
          <h2 className="main-content-heading">{state?.name}</h2>
          <div className="task-content">
            {/* Filters Section */}
            <div>
              <h3>Filters:</h3>
              <div>
                <label htmlFor="owners">Owners:</label>
                {users?.map((user) => (
                  <div key={user._id}>
                    <input
                      type="checkbox"
                      id={`owner-${user._id}`}
                      value={user._id}
                      onChange={ownerHandler}
                    />
                    <label htmlFor={`owner-${user._id}`}>{user.name}</label>
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="tags">Tags:</label>
                <select id="tags" value={tag} onChange={tagHandler}>
                  <option value="">All</option>
                  {tags?.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tasks List Section */}
            <h4>Tasks List:</h4>
            {tasks && tasks.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="fs-5 fw-bold">Task Name</th>
                    <th className="fs-5 fw-bold">Status</th>
                    <th className="fs-5 fw-bold">Due Date</th>
                    <th className="fs-5 fw-bold">Owners</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const dueDate = calculateDueDate(
                      task.createdAt,
                      task.timeToComplete
                    );
                    return (
                      <tr key={task._id}>
                        <td>
                          <Link
                            to={`/taskDetails/${task._id}`}
                            className="text-decoration-none text-dark fw-bold pointer"
                          >
                            {task.name}
                          </Link>
                        </td>
                        <td>{task.status}</td>
                        <td>{dueDate}</td>
                        <td>
                          {task.owners.map((o, index) => (
                            <span key={o._id}>
                              <Link
                                to={`/profile/${o._id}`}
                                className="text-decoration-none text-dark fw-bold pointer"
                              >
                                {o.name}
                              </Link>
                              {index < task.owners.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

// import React, { useEffect, useState } from "react";
// import "./ProjectDetails.css";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router";
// import { Link } from "react-router-dom";
// import { filteredTaskAsync } from "../../features/taskSlice";
// import { getAllTagsAsync } from "../../features/tagsSlice";

// const { calculateDueDate } = require("../../utils/dateFormat");

// const ProjectDetails = () => {
//   const { projectId } = useParams();
//   const { state } = useLocation();
//   const dispatch = useDispatch();

//   const { tasks } = useSelector((state) => state.task);
//   const { users } = useSelector((state) => state.user);
//   const { tags } = useSelector((state) => state.tags);

//   const [owner, setOwner] = useState([]);
//   const [tag, setTag] = useState("");

//   // Fetch tags and tasks initially
//   useEffect(() => {
//     dispatch(getAllTagsAsync());
//   }, [dispatch]);

//   // Fetch filtered tasks whenever filters change
//   useEffect(() => {
//     const filters = {
//       projectId, // Pass projectId as part of the filter
//       owner,
//       tag,
//     };
//     dispatch(filteredTaskAsync(filters));
//   }, [dispatch, projectId, owner, tag]);

//   // Handle owner filter changes
//   const ownerHandler = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setOwner((prev) => [...prev, value]);
//     } else {
//       setOwner((prev) => prev.filter((id) => id !== value));
//     }
//   };

//   // Handle tag filter changes
//   const tagHandler = (e) => {
//     setTag(e.target.value);
//   };

//   return (
//     <div className="body">
//       <div className="layout">
//         <Sidebar />
//         <div className="content">
//           <h2 className="main-content-heading">{state?.name}</h2>
//           <div className="task-content">
//             <div>
//               <h3>Filters:</h3>

//               <div>
//                 <label htmlFor="owners">Owners:</label>
//                 {users?.map((user) => (
//                   <div key={user._id}>
//                     <input
//                       type="checkbox"
//                       value={user._id}
//                       onChange={ownerHandler}
//                     />
//                     {user.name}
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 <label htmlFor="tags">Tags:</label>
//                 <select value={tag} onChange={tagHandler}>
//                   <option value="">All</option>
//                   {tags?.map((t) => (
//                     <option key={t._id} value={t._id}>
//                       {t.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <h4>Tasks List:</h4>
//             {tasks && tasks.length > 0 ? (
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col" className="fs-5 fw-bold">
//                       Task Name
//                     </th>
//                     <th scope="col" className="fs-5 fw-bold">
//                       Status
//                     </th>
//                     <th scope="col" className="fs-5 fw-bold">
//                       Due Date
//                     </th>
//                     <th scope="col" className="fs-5 fw-bold">
//                       Owners
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tasks.map((task) => {
//                     const dueDate = calculateDueDate(
//                       task.createdAt,
//                       task.timeToComplete
//                     );
//                     return (
//                       <tr key={task._id}>
//                         <td>
//                           <Link
//                             to={`/taskDetails/${task._id}`}
//                             className="text-decoration-none text-dark fw-bold pointer"
//                           >
//                             {task.name}
//                           </Link>
//                         </td>
//                         <td>{task.status}</td>
//                         <td>{dueDate}</td>
//                         <td>
//                           {task.owners.map((o, index) => (
//                             <span key={o._id}>
//                               <Link
//                                 to={`/profile/${o._id}`}
//                                 className="text-decoration-none text-dark fw-bold pointer"
//                               >
//                                 {o.name}
//                               </Link>
//                               {index < task.owners.length - 1 && ", "}
//                             </span>
//                           ))}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No tasks available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;

// // import React, { useEffect, useState } from "react";
// // import "./ProjectDetails.css";
// // import Sidebar from "../../components/Sidebar/Sidebar";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useLocation, useParams } from "react-router";
// // import { Link } from "react-router-dom";
// // import { fetchAllTasks, filteredTaskAsync } from "../../features/taskSlice";
// // import Filters from "../../components/Filters/Filters";
// // import { fetchAllTags } from "../../features/tagsSlice";

// // const { calculateDueDate } = require("../../utils/dateFormat");

// // const ProjectDetails = () => {
// //   const { projectId } = useParams();
// //   const { state } = useLocation();
// //   const dispatch = useDispatch();

// //   const { tasks } = useSelector((state) => state.task);
// //   const { users } = useSelector((state) => state.user);
// //   const { tags } = useSelector((state) => state.tags);

// //   const [owner, setOwner] = useState([]);
// //   const [tag, setTag] = useState("");

// //   // Filter project tasks by project ID
// //   let projectTasks = tasks?.filter((task) => task.project?._id === projectId);

// //   console.log(projectTasks);
// //   // Apply additional filters (owner, tag)
// //   if (owner.length > 0) {
// //     projectTasks = projectTasks.filter((task) =>
// //       task.owners.some((o) => owner.includes(o._id))
// //     );
// //   }
// //   if (tag) {
// //     // projectTasks = projectTasks.filter((task) => task.tags.includes(tag));
// //     projectTasks = projectTasks.filter((task) =>
// //       task.tags.some((t) => t._id === tag)
// //     );
// //   }

// //   // Handle owner filter changes
// //   const ownerHandler = (e) => {
// //     const { value, checked } = e.target;
// //     if (checked) {
// //       setOwner((prev) => [...prev, value]);
// //     } else {
// //       setOwner((prev) => prev.filter((id) => id !== value));
// //     }
// //   };

// //   // Handle tag filter changes
// //   const tagHandler = (e) => {
// //     setTag(e.target.value);
// //   };

// //   useEffect(() => {
// //     dispatch(fetchAllTasks());
// //     dispatch(fetchAllTags());
// //     dispatch(filteredTaskAsync())
// //   }, [dispatch]);

// //   return (
// //     <div className="body">
// //       <div className="layout">
// //         <div>
// //           <Sidebar />
// //         </div>
// //         <div className="content">
// //           <h2 className="main-content-heading">{state?.name}</h2>
// //           <div className="task-content">
// //             <div>
// //               <h3>Filters:</h3>

// //               <div>
// //                 <label htmlFor="owners">Owners:</label>
// //                 {users?.map((user) => (
// //                   <div key={user._id}>
// //                     <input
// //                       type="checkbox"
// //                       value={user._id}
// //                       onChange={ownerHandler}
// //                     />
// //                     {user.name}
// //                   </div>
// //                 ))}
// //               </div>

// //               <div>
// //                 <label htmlFor="tags">Tags:</label>
// //                 <select value={tag} onChange={tagHandler}>
// //                   <option value="">All</option>
// //                   {tags?.map((t) => (
// //                     <option key={t._id} value={t._id}>
// //                       {t.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <h4>Tasks List:</h4>
// //             {projectTasks && projectTasks.length > 0 ? (
// //               <table className="table">
// //                 <thead>
// //                   <tr>
// //                     <th scope="col" className="fs-5 fw-bold">
// //                       Task Name
// //                     </th>
// //                     <th scope="col" className="fs-5 fw-bold">
// //                       Status
// //                     </th>
// //                     <th scope="col" className="fs-5 fw-bold">
// //                       Due Date
// //                     </th>
// //                     <th scope="col" className="fs-5 fw-bold">
// //                       Owners
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {projectTasks.map((task) => {
// //                     const dueDate = calculateDueDate(
// //                       task.createdAt,
// //                       task.timeToComplete
// //                     );
// //                     return (
// //                       <tr key={task._id}>
// //                         <td>
// //                           <Link
// //                             to={`/taskDetails/${task._id}`}
// //                             className="text-decoration-none text-dark fw-bold pointer"
// //                           >
// //                             {task.name}
// //                           </Link>
// //                         </td>
// //                         <td>{task.status}</td>
// //                         <td>{dueDate}</td>
// //                         <td>
// //                           {task.owners.map((o, index) => (
// //                             <span key={o._id}>
// //                               <Link
// //                                 to={`/profile/${o._id}`}
// //                                 className="text-decoration-none text-dark fw-bold pointer"
// //                               >
// //                                 {o.name}
// //                               </Link>
// //                               {index < task.owners.length - 1 && ", "}
// //                             </span>
// //                           ))}
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             ) : (
// //               <p>No tasks available</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectDetails;
