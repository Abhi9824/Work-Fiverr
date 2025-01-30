export const calculateDueDate = (createdAt, timeToComplete) => {
  // Convert createdAt to a Date object
  const createdAtDate = new Date(createdAt);

  // Add timeToComplete days to createdAt
  const dueDate = new Date(
    createdAtDate.getTime() + timeToComplete * 24 * 60 * 60 * 1000
  );

  // Formatting the dueDate as "YYYY-MM-DD"
  const formattedDueDate = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dueDate.getDate().toString().padStart(2, "0")}`;

  return formattedDueDate;
};

export const calculateRemainingDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffInTime = due.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays > 0 ? `${diffInDays} days remaining` : "No due days";
};
