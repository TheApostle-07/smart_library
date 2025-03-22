function extractDomains(emails) {
    const validEmails = emails.filter(email => email.includes('@'));
  
    const domains = validEmails.map(email => email.split('@')[1]);
  
    const uniqueSortedDomains = Array.from(new Set(domains)).sort();
  
    return uniqueSortedDomains;
  }
  
  const emails = [
    "user1@gmail.com",
    "user2@yahoo.com",
    "user3@gmail.com",
    "user4@outlook.com",
    "user5@yahoo.com",
    "user6@gmail.com"
  ];
  
  console.log(extractDomains(emails));