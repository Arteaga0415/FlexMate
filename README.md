# FlexMate
# Go and install the dependencies on the server and client with npm I. 

# To run the project

# Client: npm start (For windows)
(If you have a mac most likely!!!)
Change this below on the package.json in the client: 

"scripts": {
    "start": "cross-env GENERATE_SOURCEMAP=false react-scripts start",
    }

I think it is:
"start": "react-scripts start",


# Server: nodemon index.js

