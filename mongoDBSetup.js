db.createUser({
  user: "testcomposeuser",
  pwd: "Test123",
  roles: [
    {
      role: "readWrite",
      db: "placementcell",
    },
    {
      role: "dbAdmin",
      db: "placementcell",
    },
  ],
});

db = db.getSiblingDB("placementcell");

db.createCollection("users");
db.createCollection("companies");
db.createCollection("discussions");
db.createCollection("quizzes");
db.createCollection("videos");

db.users.insert([
  {
    firstName: "caped",
    lastName: "crusader",
    email: "abc@abc.com",
    password: "$2b$10$nO5lp8Iiiied52LrsjsKaO9z8cuoGULB9LpFkIO.KFsEzJUE9ZKNK",
    date: 1604321114966,
  },
]);

db.companies.insert([
  {
    companyName: "Nestle",
    category: "Food Products",
    branch: "CIV",
    minCGPA: 7.5,
    backlog: 3,
    CTC: "8.4 LPA",
    dateOpen: 1600860804403,
    dateClose: 1600860804403,
    link: "https://www.nestle.in/jobs",
  },
  {
    companyName: "Accenture",
    category: "Technology",
    branch: "ISE",
    minCGPA: 9.5,
    backlog: 1.0,
    CTC: "7.9 LPA",
    dateOpen: 1600860803689,
    dateClose: 1600860803689,
    link: "https://www.accenture.com/in-en/careers",
  },
  {
    companyName: "J.P Morgan",
    category: "Banking",
    branch: "CSE",
    minCGPA: 9.5,
    backlog: 2.3,
    CTC: "9.3 LPA",
    dateOpen: 1600860803685,
    dateClose: 1600860803685,
    link: "https://careers.jpmorgan.com/us/en/home",
  },
]);

db.discussions.insert([
  {
    title: "Accenture Recruitment",
    description: "What is the eligibility criteria?",
    firstName: "Jereme",
    lastName: "Murrock",
    email: "jmurrock6@wp.com",
    comments: [
      {
        comment: "7+ CGPA with no backlogs.",
        firstName: "Adelind",
        lastName: "Swindall",
        email: "aswindall7@plala.or.jp",
        createdAt: 1600861367191,
        updatedAt: 1600861367191,
      },
      {
        comment: "Thank You.",
        firstName: "Jereme",
        lastName: "Murrock",
        email: "jmurrock6@wp.com",
        createdAt: 1600861400963,
        updatedAt: 1600861400963,
      },
    ],
    createdAt: 1600861121823,
    updatedAt: 1600861400963,
  },
  {
    title: "AMCAT Exam",
    description: "When is AMCAT exam scheduled?",
    firstName: "Ferdinand",
    lastName: "Leverton",
    email: "fleverton1@desdev.cn",
    comments: [
      {
        comment: "Saturday 10th October 2020",
        firstName: "Deanna",
        lastName: "Berkelay",
        email: "dberkelay4@addtoany.com",
        createdAt: 1600861615758,
        updatedAt: 1600861615758,
      },
      {
        comment: "Thanks",
        firstName: "Ferdinand",
        lastName: "Leverton",
        email: "fleverton1@desdev.cn",
        createdAt: 1600862063603,
        updatedAt: 1600862063603,
      },
    ],
    createdAt: 1600861486100,
    updatedAt: 1600862063604,
  },
]);

db.quizzes.insert([
  {
    question: "The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Re. 1. The sum (in Rs.) is?",
    optionA: "640",
    optionB: "630",
    optionC: "625",
    optionD: "650",
    answer: "625",
  },
  {
    question: "What is the difference between the compound interests on Rs. 5000 for 1 years at 4% per annum compounded yearly and half-yearly?",
    optionA: "Rs. 2.04",
    optionB: "Rs. 3.06",
    optionC: "Rs. 4.80",
    optionD: "Rs. 8.30",
    answer: "Rs. 2.04",
  },
  {
    question: "A bank offers 5% compound interest calculated on half-yearly basis. A customer deposits Rs. 1600 each on 1st January and 1st July of a year. At the end of the year, the amount he would have gained by way of interest is?",
    optionA: "Rs. 120",
    optionB: "Rs. 121",
    optionC: "Rs. 122",
    optionD: "Rs. 123",
    answer: "Rs. 121",
  },
]);

db.videos.insert([
  {
    topic: "Quantitative Aptitude",
    subtopic: "Averages + Profit and Loss",
    link: "https://youtu.be/iZUZ1B87rPc",
  },
  {
    topic: "Quantitative Aptitude",
    subtopic: "Simple Interest and Compound Interest",
    link: "https://youtu.be/E3lJmCwUWZE",
  },
  {
    topic: "Quantitative Aptitude",
    subtopic: "Profit and loss and Partnership",
    link: "https://youtu.be/tg8d8gEw7IY",
  },
  {
    topic: "Quantitative Aptitude",
    subtopic: "Permutation Combination",
    link: "https://youtu.be/n_F5BRhkG7U",
  },
  {
    topic: "Quantitative Aptitude",
    subtopic: "Mixtures and Allegation",
    link: "https://youtu.be/QGzOXbLwhRM",
  },
  {
    topic: "Logical Reasoning",
    subtopic: "Directions",
    link: "https://youtu.be/R_Ug5PmcPuA",
  },
  {
    topic: "Logical Reasoning",
    subtopic: "Blood Relations",
    link: "https://youtu.be/LRdLhfDupMU",
  },
]);
