# Docker Crash Course

This  repository houses all of the code used during the crash course session. If you're curious about some specific thing in the session, this is the place to look. We are using `docker`, `node.js:10`, `express`, and `mongodb` for your reference. Also, keep in mind that the web app contained is merely for explanation of `docker`, nothing more and thus a lot of it is very simple.  

## Getting the App Running
The app is based on `node.js` and thus npm was used. Make sure that you have both `node.js` and npm installed on your system before proceeding. 

1. Run `npm install` to get all of the dependencies on your system
2. Run `docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4`
3. Run `docker build . -t app`
4. Run `docker run -d -p 8080:8080 app`
5. If you're on AWS Cloud9, click `Preview >> Preview Running Application` to see your running application. Otherwise, go to `localhost:8080` in your browser.
