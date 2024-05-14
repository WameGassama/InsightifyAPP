export function getInitials(name: string) {
  // Split the name by whitespace
  const words = name.trim().split(/\s+/);

  // Initialize an empty string for storing initials
  let initials = '';

  // Initialize a count for added initials
  let count = 0;

  // Iterate over each word in the name
  words.forEach((word) => {
    // Extract the first character of each word
    const initial = word.charAt(0);

    // Check if the extracted character is a letter and count is less than 2
    if (/[a-zA-Z]/.test(initial) && count < 2) {
      // Append the initial to the initials string
      initials += initial.toUpperCase();

      // Increment the count
      count++;
    }
  });

  // Return the initials
  return initials;
}
