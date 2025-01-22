// import React, { useState, useEffect } from "react";

// const Filters = ({ fetchAllTasks, projectTasks }) => {
//   const [filteredTasks, setFilteredTasks] = useState(projectTasks);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedOwner, setSelectedOwner] = useState([]);
//   const [sortOption, setSortOption] = useState("");   




 
//   return (
//     <div className="filters">
//       <h4>Filters:</h4>

//       {/* Filter by Tags */}
//       <div>
//         <h5>Tags</h5>
//         {uniqueTags.map((tag) => (
//           <label key={tag}>
//             <input
//               type="checkbox"
//               value={tag}
//               checked={selectedTags.includes(tag)}
//               onChange={() => handleTagChange(tag)}
//             />
//             {tag}
//           </label>
//         ))}
//       </div>

//       {/* Filter by Owner */}
//       <div>
//         <h5>Owners</h5>
//         <select value={selectedOwner} onChange={handleOwnerChange}>
//           <option value="">All Owners</option>
//           {uniqueOwners.map((owner) => (
//             <option key={owner} value={owner}>
//               {owner}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Sort Options */}
//       <div>
//         <h5>Sort By</h5>
//         <select value={sortOption} onChange={handleSortChange}>
//           <option value="">None</option>
//           <option value="dueDate">Due Date</option>
//           <option value="priority">Priority</option>
//         </select>
//       </div>

//       {/* Filtered Task Count */}
//       <div>
//         <h5>Filtered Tasks: {filteredTasks.length}</h5>
//       </div>
//     </div>
//   );
// };

// export default Filters;
