export function formatFirebaseTimestamp(firebaseTimestamp) {
    if(!firebaseTimestamp) return null;
    // Convert Firebase Timestamp to JavaScript Date
    const date = new Date(firebaseTimestamp.seconds * 1000);
  
    // Format the date using 'LLL' format
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };

    return date.toLocaleString('en-US', options);
  
  }
  
  