module.exports = [
  [
    "What is Spring Boot?",
    "Explain Spring Boot and why it is used.",
    "Spring Boot is a Java framework built on top of the Spring Framework that simplifies building stand-alone, production-ready applications with minimal configuration, using auto-configuration and embedded servers.",
    "Easy",
    [
      "A framework that simplifies Spring app setup with auto-configuration",
      "A database management system",
      "A frontend JavaScript library",
      "An operating system for servers"
    ],
    0
  ],

  [
    "What is the purpose of @SpringBootApplication?",
    "Explain the @SpringBootApplication annotation.",
    "@SpringBootApplication is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan, marking the main class of a Spring Boot application.",
    "Easy",
    [
      "Combines @Configuration, @EnableAutoConfiguration and @ComponentScan",
      "Starts a MySQL database",
      "Compiles Java bytecode",
      "Defines a REST endpoint"
    ],
    0
  ],

  [
    "What is Auto-Configuration in Spring Boot?",
    "Explain auto-configuration.",
    "Auto-configuration automatically configures Spring beans based on the jar dependencies present on the classpath, reducing the need for manual XML or Java configuration.",
    "Medium",
    [
      "Automatic bean configuration based on classpath dependencies",
      "Automatic UI generation",
      "Automatic database backup",
      "Automatic code formatting"
    ],
    0
  ],

  [
    "What is an embedded server in Spring Boot?",
    "Explain embedded servers.",
    "Spring Boot ships with embedded servers like Tomcat, Jetty, or Undertow, allowing applications to run as standalone JARs without needing an external application server.",
    "Easy",
    [
      "A web server packaged inside the application JAR (e.g. Tomcat)",
      "A server installed on a USB drive",
      "A database server bundled with Java",
      "A caching layer"
    ],
    0
  ],

  [
    "What is a Spring Boot Starter?",
    "Explain Spring Boot starters.",
    "Starters are curated dependency descriptors (e.g. spring-boot-starter-web) that bundle commonly used libraries together so developers don't have to manage individual dependency versions.",
    "Easy",
    [
      "A curated set of dependencies for a specific feature",
      "A tool to start the JVM faster",
      "A CLI to scaffold HTML pages",
      "A logging framework"
    ],
    0
  ],

  [
    "What is the difference between @Component, @Service and @Repository?",
    "Explain these stereotype annotations.",
    "All three register a class as a Spring bean. @Service marks service-layer business logic, @Repository marks data-access classes and enables exception translation, while @Component is the generic stereotype used when neither applies.",
    "Medium",
    [
      "They are specialized stereotypes of @Component for different layers",
      "They are unrelated annotations",
      "Only @Component creates a bean, the others do not",
      "They configure database connections"
    ],
    0
  ],

  [
    "What is Dependency Injection in Spring Boot?",
    "Explain Dependency Injection (DI).",
    "Dependency Injection is a design pattern where the Spring container creates objects and injects their required dependencies automatically, instead of the objects creating dependencies themselves, promoting loose coupling.",
    "Medium",
    [
      "The Spring container supplies an object's dependencies automatically",
      "A way to inject SQL queries",
      "A method to inject CSS into HTML",
      "A JVM memory optimization"
    ],
    0
  ],

  [
    "What does @Autowired do?",
    "Explain the @Autowired annotation.",
    "@Autowired tells Spring to automatically resolve and inject a matching bean into a field, constructor, or setter, based on type (and qualifier, if specified).",
    "Easy",
    [
      "Automatically injects a required bean dependency",
      "Automatically writes unit tests",
      "Automatically deploys the app to the cloud",
      "Automatically formats JSON responses"
    ],
    0
  ],

  [
    "What is the use of @RestController?",
    "Explain the @RestController annotation.",
    "@RestController combines @Controller and @ResponseBody, so every method's return value is automatically serialized (e.g. to JSON) and written directly to the HTTP response body.",
    "Easy",
    [
      "Marks a class as a controller that returns data directly as the response body",
      "Marks a class as a JPA entity",
      "Marks a class as a configuration file",
      "Marks a class as a test case"
    ],
    0
  ],

  [
    "What is the difference between @RequestMapping, @GetMapping and @PostMapping?",
    "Explain HTTP mapping annotations.",
    "@RequestMapping is a general-purpose annotation that can map any HTTP method and can be narrowed with a method attribute, while @GetMapping and @PostMapping are shorthand annotations restricted to GET and POST requests respectively.",
    "Medium",
    [
      "@GetMapping/@PostMapping are shorthand for @RequestMapping restricted to one HTTP verb",
      "They all do exactly the same thing with no difference",
      "@RequestMapping only works with databases",
      "@GetMapping is used only in unit tests"
    ],
    0
  ],

  [
    "What is application.properties used for?",
    "Explain the application.properties file.",
    "application.properties (or application.yml) is the default configuration file in Spring Boot used to set values like server port, datasource URL, and custom app settings without touching code.",
    "Easy",
    [
      "The default file for externalized application configuration",
      "A file that stores compiled bytecode",
      "A file used only for logging errors",
      "A file that stores frontend assets"
    ],
    0
  ],

  [
    "What are Spring Profiles?",
    "Explain Spring Boot profiles.",
    "Profiles let you define different sets of configuration (e.g. application-dev.properties, application-prod.properties) and activate the appropriate one per environment using spring.profiles.active.",
    "Medium",
    [
      "Environment-specific configuration sets that can be switched at runtime",
      "User login profiles stored in a database",
      "A way to profile CPU performance",
      "Security roles assigned to users"
    ],
    0
  ],

  [
    "What is Spring Boot Actuator?",
    "Explain Spring Boot Actuator.",
    "Actuator is a Spring Boot module that exposes production-ready endpoints (like /actuator/health and /actuator/metrics) for monitoring and managing a running application.",
    "Medium",
    [
      "A module that exposes endpoints for monitoring and managing the app",
      "A build tool that compiles the project",
      "A frontend component library",
      "A database migration tool"
    ],
    0
  ],

  [
    "What is the role of @RequestBody and @PathVariable?",
    "Explain these parameter-binding annotations.",
    "@RequestBody binds the HTTP request body (typically JSON) to a Java object, while @PathVariable extracts a value directly from the URI path, such as an id in /users/{id}.",
    "Medium",
    [
      "@RequestBody binds the JSON body; @PathVariable binds a URI path segment",
      "Both bind query string parameters only",
      "@RequestBody is used only for GET requests",
      "@PathVariable reads HTTP headers"
    ],
    0
  ],

  [
    "What is Spring Data JPA?",
    "Explain Spring Data JPA.",
    "Spring Data JPA is a Spring module that simplifies data access by letting developers define repository interfaces (extending JpaRepository) and automatically generates the implementation, including common CRUD operations.",
    "Medium",
    [
      "A module that auto-generates data access code from repository interfaces",
      "A JavaScript ORM for MongoDB",
      "A tool for writing raw SQL scripts only",
      "A caching library unrelated to databases"
    ],
    0
  ],

  [
    "What is the default embedded server used by Spring Boot?",
    "Explain the default server.",
    "Apache Tomcat is the default embedded servlet container used by Spring Boot's spring-boot-starter-web, though it can be swapped for Jetty or Undertow.",
    "Easy",
    [
      "Apache Tomcat",
      "Nginx",
      "Apache HTTP Server",
      "IIS"
    ],
    0
  ],

  [
    "What is @Configuration and @Bean used for?",
    "Explain Java-based configuration.",
    "@Configuration marks a class as a source of bean definitions, and methods inside it annotated with @Bean return objects that Spring registers and manages in its application context.",
    "Medium",
    [
      "Defining beans manually through Java code instead of XML",
      "Configuring the database schema only",
      "Marking a class as a REST endpoint",
      "Enabling security filters"
    ],
    0
  ],

  [
    "What is the purpose of the CommandLineRunner interface?",
    "Explain CommandLineRunner.",
    "CommandLineRunner is a functional interface whose run() method executes automatically right after the Spring Boot application context has started, often used for startup tasks like seeding data.",
    "Medium",
    [
      "Runs code automatically right after the application starts",
      "Runs unit tests before compilation",
      "Handles HTTP GET requests",
      "Runs database migrations only in production"
    ],
    0
  ],

  [
    "How do you change the default server port in Spring Boot?",
    "Explain server port configuration.",
    "The default port (8080) can be changed by setting server.port=9090 in application.properties, or the equivalent key in application.yml.",
    "Easy",
    [
      "Set server.port in application.properties",
      "Edit the pom.xml file",
      "Change the JDK version",
      "Restart the operating system"
    ],
    0
  ],

  [
    "What is the difference between Spring and Spring Boot?",
    "Compare Spring Framework and Spring Boot.",
    "Spring is a comprehensive framework requiring manual configuration (XML/Java config) for beans and servers, while Spring Boot builds on Spring to provide auto-configuration, embedded servers, and starter dependencies for rapid, opinionated setup.",
    "Medium",
    [
      "Spring Boot adds auto-configuration and embedded servers on top of Spring",
      "They are completely unrelated frameworks",
      "Spring Boot is only used for frontend development",
      "Spring is newer than Spring Boot"
    ],
    0
  ],

  [
    "What is the purpose of @ExceptionHandler and @ControllerAdvice?",
    "Explain centralized exception handling.",
    "@ExceptionHandler defines a method that handles a specific exception type, and @ControllerAdvice applies such handlers globally across all controllers, enabling centralized, consistent error responses.",
    "Hard",
    [
      "They enable centralized, global exception handling across controllers",
      "They validate incoming JSON request bodies",
      "They configure database connection pooling",
      "They are used only for logging"
    ],
    0
  ],

  [
    "What is @Value used for in Spring Boot?",
    "Explain the @Value annotation.",
    "@Value injects values from properties files, environment variables, or SpEL expressions directly into fields, such as @Value(\"${server.port}\") to read a configured property.",
    "Medium",
    [
      "Injects a property or expression value into a field",
      "Validates a form field",
      "Sets the return value of a REST endpoint",
      "Defines a database column"
    ],
    0
  ],

  [
    "What is Spring Boot DevTools?",
    "Explain the DevTools module.",
    "Spring Boot DevTools is a development-time dependency that provides automatic application restarts, live reload, and sensible default configurations to speed up the development feedback loop.",
    "Easy",
    [
      "A tool that enables automatic restarts and faster development feedback",
      "A production deployment tool",
      "A tool for writing SQL migrations",
      "A frontend build tool"
    ],
    0
  ],

  [
    "What are bean scopes in Spring, and what is the default?",
    "Explain Spring bean scopes.",
    "Bean scope defines the lifecycle and visibility of a bean; common scopes are singleton (one shared instance, the default), prototype (new instance per request), request, and session.",
    "Hard",
    [
      "Singleton is the default; other scopes include prototype, request and session",
      "Prototype is the default scope for every bean",
      "All beans are stateless and scope does not apply",
      "Scopes only apply to database entities"
    ],
    0
  ],

  [
    "How does Spring Boot simplify building microservices?",
    "Explain Spring Boot's fit for microservices.",
    "Spring Boot's embedded servers, starter dependencies, auto-configuration, and Actuator endpoints let teams quickly build small, independently deployable, self-contained services with minimal boilerplate — a natural fit for microservice architectures.",
    "Hard",
    [
      "Its embedded servers and auto-configuration make small, independent services easy to build and deploy",
      "It compiles services into a single monolithic WAR file",
      "It requires a separate application server for every service",
      "It only supports building desktop applications"
    ],
    0
  ]
];
