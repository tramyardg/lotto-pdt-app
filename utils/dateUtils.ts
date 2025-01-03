// src/utils/dateUtils.ts

export const getDayAndDate = (dateString: string): [string, string] => {
    const date = new Date(dateString); // Convert the date string to a Date object
  
    if (isNaN(date.getTime())) {
      console.error('Invalid Date');
      return ['', '']; // Return empty strings if the date is invalid
    }
  
    // Get the day of the week using .getDay() (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek: string = daysOfWeek[date.getDay() + 1];
  
    // Format the date to 'YYYY-MM-DD'
    const formattedDate: string = date.toISOString().split('T')[0]; // '2025-01-03'
  
    return [formattedDate, dayOfWeek]; // Returns a tuple: ['2025-01-03', 'Thu']
  };
  