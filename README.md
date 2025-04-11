# Web Dev - Prof Aedo, Spring 2025
# An improved app that will allow students a more updated experience when trying to find parking
# More frequently updated app than the current UCF parking map


How to use site:
1. First clone everything from GitHub into your local IDE (i'm using WebStorm)
2. Make sure you have admin ability to run host things locally

3. (install node) nginx Copy node -v

4. install all dependancies and packages:
	"@react-google-maps/api": "^2.20.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.7",
        "express": "^4.21.2",
        "express-session": "^1.18.1",
        "mysql2": "^3.12.0",
        "passport": "^0.7.0",
        "passport-google-oauth20": "^2.0.0",
        "passport-saml": "^3.2.4"
5. also do and "npm install concurrently --save dev" if you want use the script for running the client and server in one command

Setup local MySQL server:
6. Download/install MySQL Community server
7. Create a new database (i'm not going to go into detail about this)
8. Download the ucf_parking.sql export I left in the root directory of the project
9. import that stuff so you have the table structure for the database to run local
10. go to the .env file in the directory "test server"--> server-->routes-->.env
11. change the credentials to match your database name and password
12. The program should be able to automatically access your tables and update them using the external endpoints

Setup Oauth with google cloud:
13. Go to google cloud and sign up for Oauth 2.0 Client IDs
14. Go to the credentials tab and "create credentials"
15. Once done setting up, your authoriazed JavaScript origins should be set to "http://localhost:5000"
16. Authorized redirect URIs  set to: "http://localhost:5000/auth/google/callback"
17. Now from the clients tab get your "Client ID", "Client secret" 
18. update those credentials in your .env file.

19. From the terminal in  your IDE type "npm start"
20. verify that the terminal outputs statements 

/*webdev-root@1.0.0 start
> concurrently "npm start --prefix \"test server\"/server" "npm start --prefix \"test server\"/client"

[1] 
[1] > client@1.0.0 start
[1] > react-scripts start
[1]
[0]
[0] > backend@1.0.0 start
[0] > node server.js
[0]
[0] Server sees GOOGLE_CLIENT_ID: 65772307916-9jtsi48go2c094gdubnpqf66ts0aac4q.apps.googleusercontent.com
[0] Server is running on http://localhost:5000
[1] (node:30840) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
[1] (Use `node --trace-deprecation ...` to show where the warning was created)
[1] (node:30840) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
[1] Starting the development server...
[1]
[1] Compiled successfully!
[1]
[1] You can now view client in the browser.
[1]
[1]   Local:            http://localhost:3000
[1]   On Your Network:  http://192.168.56.1:3000
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
[1]
[1] webpack compiled successfully
[0] Updating the garage data homie!!!
[0] Successfully updated da stuff for Paramore Garage
[0] Successfully updated da stuff for Amelia Garage
[0] Successfully updated da stuff for Garage C
[0] Successfully updated da stuff for Garage I
[0] Successfully updated da stuff for Garage B
[0] Successfully updated da stuff for Garage H
[0] Successfully updated da stuff for Garage D
[0] Successfully updated da stuff for Garage A
[0] Successfully updated da stuff for Rosen Lot*/


AI USAGE:
AI Usage Summary – Parking Garage App Project
Overall Role of AI:
AI (ChatGPT, Deepseek, Copilot, JanAI:Qwen2.5 Coder 32B Instruct Q4[local run model]) was used extensively throughout the project to guide development, debug code, and streamline implementation decisions by the whole group.

Prompts Used:

-Web app architecture (JavaScript/React) design

-Design and logic help for a real-time parking garage monitor

-Optimization of SQL database foreign key handling

-Component and function breakdowns



Affected Components & Features:

-Frontend Pages:

-Homepage (displaying google maps of garages)

-Garage status display (HTML/CSS guidance and design)

-Real-time updates logic (JavaScript help for sensor integration and UI refresh)

-Login page

-User profile page


Backend Functions:

-Recommendations for normalization and foreign key constraints


AI Contributions:

Accelerated troubleshooting and logic validation

Helped break down unfamiliar tasks (e.g. React.js, Oauth, GoogleAPI, Express.js, etc)

