module.exports = [

  [
    "What is Express.js?",
    "Explain Express.js.",
    "Express.js is a fast and minimalist web application framework for Node.js used to build web servers and APIs.",
    "Easy",
    [
      "Database",
      "Node.js web framework",
      "Programming language",
      "Operating system"
    ],
    1
  ],

  [
    "What is the main purpose of Express.js?",
    "Explain the purpose of Express.js.",
    "Express.js is mainly used to build web applications, REST APIs, and backend servers using Node.js.",
    "Easy",
    [
      "To design images",
      "To build backend applications and APIs",
      "To manage databases only",
      "To create operating systems"
    ],
    1
  ],

  [
    "Express.js is built on top of which technology?",
    "Explain the foundation of Express.js.",
    "Express.js is a web framework built on top of Node.js.",
    "Easy",
    [
      "Java",
      "Python",
      "Node.js",
      "Angular"
    ],
    2
  ],

  [
    "Which command is commonly used to install Express.js?",
    "Explain Express installation.",
    "The npm install express command is used to install Express.js in a Node.js project.",
    "Easy",
    [
      "npm add node",
      "npm install express",
      "node install express",
      "npm express"
    ],
    1
  ],

  [
    "Which object is commonly used to create an Express application?",
    "Explain express app creation.",
    "The express() function is used to create an Express application instance.",
    "Easy",
    [
      "express.app()",
      "express()",
      "app.express()",
      "create.express()"
    ],
    1
  ],

  [
    "Which method is used to start an Express server?",
    "Explain app.listen().",
    "The app.listen() method is used to start the Express server and listen for incoming requests.",
    "Easy",
    [
      "app.start()",
      "app.run()",
      "app.listen()",
      "app.server()"
    ],
    2
  ],

  [
    "Which HTTP method is commonly used to retrieve data?",
    "Explain GET request.",
    "The GET method is commonly used to retrieve data from a server.",
    "Easy",
    [
      "POST",
      "GET",
      "DELETE",
      "PATCH"
    ],
    1
  ],

  [
    "Which HTTP method is commonly used to create new data?",
    "Explain POST request.",
    "The POST method is commonly used to send data to the server and create a new resource.",
    "Easy",
    [
      "GET",
      "PUT",
      "POST",
      "DELETE"
    ],
    2
  ],

  [
    "Which HTTP method is commonly used to update an existing resource completely?",
    "Explain PUT request.",
    "The PUT method is commonly used to completely update or replace an existing resource.",
    "Easy",
    [
      "POST",
      "GET",
      "PATCH",
      "PUT"
    ],
    3
  ],

  [
    "Which HTTP method is commonly used for partial updates?",
    "Explain PATCH request.",
    "The PATCH method is commonly used to partially update an existing resource.",
    "Easy",
    [
      "PUT",
      "PATCH",
      "POST",
      "GET"
    ],
    1
  ],

  [
    "Which HTTP method is used to delete a resource?",
    "Explain DELETE request.",
    "The DELETE method is used to remove a resource from the server.",
    "Easy",
    [
      "REMOVE",
      "DELETE",
      "DROP",
      "CLEAR"
    ],
    1
  ],

  [
    "What is routing in Express.js?",
    "Explain Express routing.",
    "Routing defines how an application responds to requests for specific URLs and HTTP methods.",
    "Easy",
    [
      "Managing databases",
      "Defining responses for URLs and HTTP methods",
      "Styling web pages",
      "Creating HTML files"
    ],
    1
  ],

  [
    "Which method is used to handle GET requests in Express?",
    "Explain app.get().",
    "The app.get() method is used to define a route that handles HTTP GET requests.",
    "Easy",
    [
      "app.fetch()",
      "app.get()",
      "app.request()",
      "app.read()"
    ],
    1
  ],

  [
    "Which method is used to handle POST requests in Express?",
    "Explain app.post().",
    "The app.post() method is used to define a route that handles HTTP POST requests.",
    "Easy",
    [
      "app.send()",
      "app.post()",
      "app.create()",
      "app.add()"
    ],
    1
  ],

  [
    "Which method is used to handle DELETE requests in Express?",
    "Explain app.delete().",
    "The app.delete() method is used to define a route that handles HTTP DELETE requests.",
    "Easy",
    [
      "app.remove()",
      "app.delete()",
      "app.destroy()",
      "app.clear()"
    ],
    1
  ],

  [
    "What are req and res in an Express route?",
    "Explain request and response objects.",
    "req represents the incoming request, while res represents the response that the server sends back to the client.",
    "Easy",
    [
      "Request and response objects",
      "Database and server objects",
      "Router and middleware objects",
      "HTML and CSS objects"
    ],
    0
  ],

  [
    "What is the purpose of res.send()?",
    "Explain res.send().",
    "The res.send() method sends a response to the client.",
    "Easy",
    [
      "Receives a request",
      "Sends a response",
      "Creates a route",
      "Starts the server"
    ],
    1
  ],

  [
    "What is the purpose of res.json()?",
    "Explain res.json().",
    "The res.json() method sends a JSON response to the client.",
    "Easy",
    [
      "Sends an HTML page",
      "Sends a JSON response",
      "Creates a database",
      "Starts a server"
    ],
    1
  ],

  [
    "What is middleware in Express.js?",
    "Explain Express middleware.",
    "Middleware functions are functions that have access to the request object, response object, and the next middleware function.",
    "Medium",
    [
      "A database table",
      "A function that runs during the request-response cycle",
      "A frontend component",
      "A CSS file"
    ],
    1
  ],

  [
    "Which function is used to pass control to the next middleware?",
    "Explain next().",
    "The next() function passes control to the next middleware function in the request-response cycle.",
    "Easy",
    [
      "continue()",
      "next()",
      "forward()",
      "nextMiddleware()"
    ],
    1
  ],

  [
    "Which method is used to register middleware globally in Express?",
    "Explain app.use().",
    "The app.use() method is commonly used to register middleware functions in an Express application.",
    "Easy",
    [
      "app.middleware()",
      "app.use()",
      "app.addMiddleware()",
      "app.register()"
    ],
    1
  ],

  [
    "What happens if middleware does not send a response or call next()?",
    "Explain middleware flow.",
    "The request may remain pending because the middleware has not passed control or sent a response.",
    "Medium",
    [
      "The server always restarts",
      "The request may remain pending",
      "The database is deleted",
      "The browser closes"
    ],
    1
  ],

  [
    "What is application-level middleware?",
    "Explain application-level middleware.",
    "Application-level middleware is bound to an Express application instance using app.use() or specific HTTP method functions.",
    "Medium",
    [
      "Middleware bound to the application instance",
      "Middleware used only in databases",
      "Middleware used only in browsers",
      "Middleware used for CSS"
    ],
    0
  ],

  [
    "What is router-level middleware?",
    "Explain router-level middleware.",
    "Router-level middleware works similarly to application-level middleware but is attached to an Express Router instance.",
    "Medium",
    [
      "Middleware attached to an Express Router",
      "Middleware attached to a database",
      "Middleware attached to HTML",
      "Middleware attached to CSS"
    ],
    0
  ],

  [
    "What is Express Router?",
    "Explain express.Router().",
    "Express Router is used to create modular and mountable route handlers for an Express application.",
    "Medium",
    [
      "A database manager",
      "A routing system for modular route handlers",
      "A frontend framework",
      "A CSS library"
    ],
    1
  ],

  [
    "Which function is used to create an Express Router?",
    "Explain express.Router().",
    "The express.Router() function is used to create a new router object.",
    "Easy",
    [
      "express.Route()",
      "express.Router()",
      "express.createRouter()",
      "express.newRouter()"
    ],
    1
  ],

  [
    "Why is Express Router useful?",
    "Explain the use of Express Router.",
    "Express Router helps organize application routes into separate and reusable modules.",
    "Medium",
    [
      "It stores database records",
      "It organizes routes into modular files",
      "It styles HTML",
      "It compiles JavaScript"
    ],
    1
  ],

  [
    "What is a route parameter in Express?",
    "Explain route parameters.",
    "A route parameter is a dynamic value included in a URL path and accessed using req.params.",
    "Easy",
    [
      "A CSS variable",
      "A dynamic value in the URL path",
      "A database column",
      "A request header"
    ],
    1
  ],

  [
    "How do you access route parameters in Express?",
    "Explain req.params.",
    "Route parameters can be accessed using the req.params object.",
    "Easy",
    [
      "req.body",
      "req.query",
      "req.params",
      "req.headers"
    ],
    2
  ],

  [
    "What is req.query used for?",
    "Explain query parameters.",
    "The req.query object is used to access query string parameters from the URL.",
    "Easy",
    [
      "URL query parameters",
      "Request body data",
      "Route parameters",
      "Response headers"
    ],
    0
  ],

  [
    "What is req.body used for?",
    "Explain req.body.",
    "The req.body object contains data sent by the client in the request body.",
    "Easy",
    [
      "URL parameters",
      "Request body data",
      "Response data",
      "Server configuration"
    ],
    1
  ],

  [
    "Which middleware is commonly used to parse JSON request bodies?",
    "Explain express.json().",
    "express.json() middleware parses incoming requests with JSON payloads.",
    "Easy",
    [
      "express.body()",
      "express.json()",
      "express.parse()",
      "express.data()"
    ],
    1
  ],

  [
    "Which middleware is used to parse URL-encoded form data?",
    "Explain express.urlencoded().",
    "express.urlencoded() middleware parses incoming requests with URL-encoded payloads.",
    "Medium",
    [
      "express.form()",
      "express.urlencoded()",
      "express.parseForm()",
      "express.bodyParser()"
    ],
    1
  ],

  [
    "What is a REST API?",
    "Explain REST API.",
    "A REST API is an architectural style for building web services that commonly uses HTTP methods to perform operations on resources.",
    "Easy",
    [
      "A CSS framework",
      "An API style using HTTP and resources",
      "A database",
      "A programming language"
    ],
    1
  ],

  [
    "Which HTTP status code indicates a successful request?",
    "Explain HTTP 200 status code.",
    "The HTTP 200 status code indicates that a request was successfully processed.",
    "Easy",
    [
      "404",
      "500",
      "200",
      "401"
    ],
    2
  ],

  [
    "Which HTTP status code indicates that a resource was created successfully?",
    "Explain HTTP 201 status code.",
    "The HTTP 201 status code indicates that a new resource was successfully created.",
    "Easy",
    [
      "200",
      "201",
      "404",
      "500"
    ],
    1
  ],

  [
    "Which HTTP status code indicates that a resource was not found?",
    "Explain HTTP 404 status code.",
    "The HTTP 404 status code indicates that the requested resource could not be found.",
    "Easy",
    [
      "400",
      "401",
      "404",
      "500"
    ],
    2
  ],

  [
    "Which HTTP status code indicates an internal server error?",
    "Explain HTTP 500 status code.",
    "The HTTP 500 status code indicates an internal server error.",
    "Easy",
    [
      "200",
      "201",
      "404",
      "500"
    ],
    3
  ],

  [
    "Which HTTP status code indicates an unauthorized request?",
    "Explain HTTP 401 status code.",
    "The HTTP 401 status code indicates that authentication is required or the provided authentication is invalid.",
    "Medium",
    [
      "400",
      "401",
      "403",
      "404"
    ],
    1
  ],

  [
    "Which HTTP status code indicates that the server understood the request but refuses to authorize it?",
    "Explain HTTP 403 status code.",
    "The HTTP 403 status code indicates that the server understood the request but refuses to authorize access.",
    "Medium",
    [
      "401",
      "403",
      "404",
      "500"
    ],
    1
  ],

  [
    "What is error-handling middleware in Express?",
    "Explain Express error handling.",
    "Error-handling middleware is used to catch and process errors that occur during request processing.",
    "Medium",
    [
      "Middleware used for CSS",
      "Middleware used to handle application errors",
      "Middleware used to create databases",
      "Middleware used to serve images"
    ],
    1
  ],

  [
    "How many parameters does Express error-handling middleware typically have?",
    "Explain error middleware parameters.",
    "Express error-handling middleware typically has four parameters: err, req, res, and next.",
    "Medium",
    [
      "2",
      "3",
      "4",
      "5"
    ],
    2
  ],

  [
    "Which parameter represents the error in Express error-handling middleware?",
    "Explain the err parameter.",
    "The err parameter contains information about the error that occurred.",
    "Easy",
    [
      "req",
      "res",
      "next",
      "err"
    ],
    3
  ],

  [
    "What is CORS?",
    "Explain CORS.",
    "CORS stands for Cross-Origin Resource Sharing and allows controlled access to resources from different origins.",
    "Medium",
    [
      "Cross-Origin Resource Sharing",
      "Common Object Request System",
      "Cross-Origin Routing Service",
      "Client-Origin Response System"
    ],
    0
  ],

  [
    "Which package is commonly used to enable CORS in an Express application?",
    "Explain the cors package.",
    "The cors package is commonly used to configure Cross-Origin Resource Sharing in Express applications.",
    "Easy",
    [
      "cross-origin",
      "cors",
      "express-cors-api",
      "origin"
    ],
    1
  ],

  [
    "What is a static file in Express?",
    "Explain static files.",
    "Static files are files such as HTML, CSS, JavaScript, images, and other assets served directly to clients.",
    "Easy",
    [
      "Database records",
      "Files served without dynamic processing",
      "Server errors",
      "API requests"
    ],
    1
  ],

  [
    "Which Express middleware is used to serve static files?",
    "Explain express.static().",
    "The express.static() middleware is used to serve static files such as images, CSS, and JavaScript files.",
    "Easy",
    [
      "express.files()",
      "express.static()",
      "express.assets()",
      "express.public()"
    ],
    1
  ],

  [
    "What is middleware order in Express?",
    "Explain middleware execution order.",
    "Express executes middleware functions in the order in which they are registered.",
    "Medium",
    [
      "Random order",
      "Alphabetical order",
      "Registration order",
      "Reverse order"
    ],
    2
  ],

  [
    "What happens when a route handler sends a response?",
    "Explain response handling.",
    "Once a response is sent, the request-response cycle is generally completed unless additional processing is explicitly required.",
    "Medium",
    [
      "The server shuts down",
      "The request-response cycle is completed",
      "The database is deleted",
      "The router restarts"
    ],
    1
  ],

  [
    "What is the purpose of app.use() with a path?",
    "Explain path-specific middleware.",
    "app.use() with a path applies middleware to requests that match the specified path prefix.",
    "Medium",
    [
      "It creates a database",
      "It applies middleware to matching path requests",
      "It changes the HTTP method",
      "It starts the server"
    ],
    1
  ],

  [
    "What is the purpose of next() in middleware?",
    "Explain next().",
    "The next() function passes control to the next middleware or route handler in the request-response cycle.",
    "Easy",
    [
      "To stop the server",
      "To pass control to the next handler",
      "To send JSON",
      "To create a route"
    ],
    1
  ],

  [
    "What is the difference between req.params and req.query?",
    "Explain req.params vs req.query.",
    "req.params contains dynamic route parameters, while req.query contains query string parameters.",
    "Medium",
    [
      "Both contain the same data",
      "params contains route parameters and query contains query string parameters",
      "query contains request body",
      "params contains response data"
    ],
    1
  ],

  [
    "What is the difference between req.body and req.query?",
    "Explain req.body vs req.query.",
    "req.body contains data sent in the request body, while req.query contains parameters provided in the URL query string.",
    "Medium",
    [
      "Both contain URL parameters",
      "body contains request body data and query contains URL query parameters",
      "body contains response data",
      "query contains database records"
    ],
    1
  ],

  [
    "What is a RESTful route?",
    "Explain RESTful routes.",
    "A RESTful route follows REST principles by using HTTP methods and resource-based URLs to perform operations.",
    "Medium",
    [
      "A CSS route",
      "A resource-based API route using HTTP methods",
      "A database connection",
      "A frontend route only"
    ],
    1
  ],

  [
    "Which HTTP method is generally considered idempotent?",
    "Explain idempotent HTTP methods.",
    "HTTP methods such as PUT and DELETE are generally considered idempotent because repeating the same request should produce the same intended result.",
    "Hard",
    [
      "POST",
      "PUT",
      "CONNECT",
      "PATCH"
    ],
    1
  ],

  [
    "What is the purpose of res.status()?",
    "Explain res.status().",
    "The res.status() method is used to set the HTTP status code of the response.",
    "Easy",
    [
      "Set response status code",
      "Read request body",
      "Create middleware",
      "Start server"
    ],
    0
  ],

  [
    "What does res.status(404).json() do?",
    "Explain status and JSON response.",
    "It sends a JSON response with HTTP status code 404.",
    "Medium",
    [
      "Sends a 200 response",
      "Sends a 404 JSON response",
      "Creates a new route",
      "Starts the server"
    ],
    1
  ],

  [
    "What is the purpose of res.redirect()?",
    "Explain res.redirect().",
    "The res.redirect() method redirects the client to another URL.",
    "Easy",
    [
      "Sends JSON data",
      "Redirects the client to another URL",
      "Creates a route",
      "Parses request data"
    ],
    1
  ],

  [
    "What is the purpose of res.sendFile()?",
    "Explain res.sendFile().",
    "The res.sendFile() method sends a file as the response to the client.",
    "Medium",
    [
      "Deletes a file",
      "Sends a file to the client",
      "Creates a file",
      "Uploads a file"
    ],
    1
  ],

  [
    "What is the purpose of res.end()?",
    "Explain res.end().",
    "The res.end() method ends the response process without sending additional response data.",
    "Medium",
    [
      "Starts the server",
      "Ends the response",
      "Creates middleware",
      "Parses JSON"
    ],
    1
  ],

  [
    "What is the purpose of the package.json file in an Express project?",
    "Explain package.json.",
    "The package.json file contains project metadata, scripts, and dependency information.",
    "Easy",
    [
      "Stores only HTML",
      "Stores project metadata and dependencies",
      "Stores database records",
      "Stores CSS styles"
    ],
    1
  ],

  [
    "Which package manager is commonly used to install Express?",
    "Explain npm.",
    "npm is a commonly used package manager for installing Express and other Node.js packages.",
    "Easy",
    [
      "Git",
      "npm",
      "HTML",
      "CSS"
    ],
    1
  ],

  [
    "What is nodemon commonly used for in Express development?",
    "Explain nodemon.",
    "Nodemon automatically restarts the Node.js application when file changes are detected during development.",
    "Easy",
    [
      "Database management",
      "Automatic server restart during development",
      "CSS styling",
      "API documentation"
    ],
    1
  ],

  [
    "What is the purpose of environment variables in an Express application?",
    "Explain environment variables.",
    "Environment variables are commonly used to store configuration values such as ports, database URLs, and secrets outside source code.",
    "Medium",
    [
      "To style HTML",
      "To store configuration values",
      "To create routes",
      "To define CSS classes"
    ],
    1
  ],

  [
    "Which Node.js object is commonly used to access environment variables?",
    "Explain process.env.",
    "The process.env object is used to access environment variables in a Node.js application.",
    "Easy",
    [
      "process.config",
      "process.env",
      "node.env",
      "app.env"
    ],
    1
  ],

  [
    "What is API endpoint?",
    "Explain API endpoint.",
    "An API endpoint is a specific URL through which a client can access a particular API resource or operation.",
    "Easy",
    [
      "A CSS selector",
      "A specific URL for accessing an API resource",
      "A database table",
      "A JavaScript variable"
    ],
    1
  ],

  [
    "What is the purpose of middleware such as authentication middleware?",
    "Explain authentication middleware.",
    "Authentication middleware checks whether a request is made by an authenticated user before allowing access to protected routes.",
    "Medium",
    [
      "To style the page",
      "To verify user authentication before protected routes",
      "To create database tables",
      "To serve CSS files"
    ],
    1
  ],

  [
    "How can protected routes be implemented in Express?",
    "Explain protected routes.",
    "Protected routes can be implemented using authentication middleware that verifies the user before allowing access.",
    "Medium",
    [
      "Using CSS",
      "Using authentication middleware",
      "Using HTML",
      "Using only database queries"
    ],
    1
  ],

  [
    "What is the purpose of separating routes and controllers in an Express application?",
    "Explain MVC-style organization.",
    "Separating routes and controllers improves code organization, maintainability, and separation of responsibilities.",
    "Hard",
    [
      "To increase CSS performance",
      "To improve code organization and separation of responsibilities",
      "To remove all middleware",
      "To eliminate APIs"
    ],
    1
  ],

  [
    "What is the difference between app.use() and app.get()?",
    "Explain app.use() vs app.get().",
    "app.use() is commonly used to register middleware or mount routers, while app.get() specifically handles GET requests for a route.",
    "Hard",
    [
      "Both only handle POST requests",
      "app.use() handles middleware and routers, while app.get() handles GET routes",
      "app.get() is used only for middleware",
      "There is no difference"
    ],
    1
  ],

  [
    "What is the purpose of route chaining in Express?",
    "Explain route chaining.",
    "Route chaining allows multiple HTTP method handlers to be defined for the same route path using methods such as route().",
    "Hard",
    [
      "To chain database queries",
      "To define multiple HTTP method handlers for one route",
      "To create CSS chains",
      "To connect multiple servers"
    ],
    1
  ]

];