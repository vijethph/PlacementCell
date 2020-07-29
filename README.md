# college-mern
A MERN stack app for college placement stuff.

### Steps to make it work in your system:
* git clone this repo
* run `npm install` inside this repo, and also inside `client` folder.
* create a mongodb database
* create a user with read-write permissions on that database only.
* get MongoDB URI. If you don't know the format, google it.
* put MongoDB URI in `server.js` file
* use the command `npm run dev` for running project. No need to run client and server separately, because I've installed 'concurrently' package and set it up.
* after changes, do the usual pull request style. 
* dummy data to push into `companies` collection in mongodb:
```json
{
   company_name: 'J.P Morgan', category: 'Banking', branch: 'CSE',
   min_cgpa: 9.5, backlog: 2, ctc: '7.9 LPA', date_open: new Date(), date_close: new Date(), link:'jpmorgan.com'
},
{
   company_name: 'Accenture', category: 'Technology', branch: 'ISE',
   min_cgpa: 8.5, backlog: 1, ctc: '7.9 LPA', date_open: new Date(), date_close: new Date(), link:'accenture.com'
},
{
   company_name: 'Nestle', category: 'Food Product', branch: 'CIV',
   min_cgpa: 7.5, backlog: 3, ctc: '7.9 LPA', date_open: new Date(), date_close: new Date(), link:'nestle.com'
}
```
> BUT DON'T MERGE THE CHANGES UNTIL I SEE THE PULL REQUESTS.
