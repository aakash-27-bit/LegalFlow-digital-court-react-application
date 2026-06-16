# CCMS- FrontEnd 
This project is Frontend of My personal Full-Stack project Court Case Management. This project uses React-Redux framework of state management, Axios for API Calls and Exhaustive HTML-CSS-Javascript structure overall.  
Backend data is supported by MongoDB and Mongoose. Thank you for visiting/contributing/updating.

[CCMS Back End Repository and API Documentation](https://github.com/Aakash-mishra2/node-express-mongodb-court-case-management-backend)

[Deployed Project](https://legalflow123.netlify.app/)


## File Tree
```
📦src
 ┣ 📂citizens
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜CitizenItem    // Each User Display Card 
 ┃ ┃ ┗ 📜CitizenList    // Collection of All Users involved in the Case
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜Authenticate    // Main Login/Signup Component to Validate User Credentials and authorize from BackEnd
 ┃ ┃ ┗ 📜Citizens       // Middleware component to fetch all users from backend and pass on 
 ┣ 📂court
 ┃ ┣ 📂components   // to display and manage registered cases by logged in User 
 ┃ ┃ ┣ 📜CaseList
 ┃ ┃ ┗ 📜CaseItem
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜RegisteredCases    //Display All cases by current user
 ┃ ┃ ┣ 📜NewCases           // To Register New Case Application
 ┃ ┃ ┗ 📜UpdateCases        // Update Existing Case description by User  
 ┣ 📂shared
 ┃ ┣ 📂Navigation
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜MainHeader
 ┃ ┃ ┣ 📜MainNavigation     // Top Navigation/Title Bar
 ┃ ┃ ┗ 📜Navlinks           // Links to all Pages on Title bar and Side menu(Mobile view)
 ┃ ┣ 📂UIelements
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜SideMenu       // Navlinks and Logout menu in Mobile App Viewport
 ┃ ┃ ┣ 📜Avatar         // Image holding and resizing component
 ┃ ┃ ┣ 📜Backdrop       // Shadow Background for modals
 ┃ ┃ ┣ 📜Card           // Main component to display all accounts and cases
 ┃ ┃ ┣ 📜Modal          // Stylish UI Element with trasition and responsive 
 ┃ ┃ ┗ 📜LoadingSpinner     // To show app loading fetching Backend Reponse on API
 ┃ ┣ 📂formElements
 ┃ ┃ ┣ 📜Button         //Custom button component can be used Link, Anchor, Button all in one
 ┃ ┃ ┗ 📜Input      // Custom input component with USER INPUT VALIDATION
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜form-hook  // Custom React Hook for validating USER INPUT VALIDATION
 ┃ ┣ 📂util
 ┃ ┃ ┗ 📜validators     // Set of Javascript Validators with pattern matching logic
 ┣ 📂features           // REDUX Store AND Slices reducers 
 ┃ ┣ 📂inputValidation  // Reducers and Actions for USER INPUT VALIDATION 
 ┃ ┃ ┗ 📜inputSlice
 ┃ ┗ 📂UserAccount      // Store USER ACCOUNT ID and Login/Logout State management
 ┃ ┃ ┗ 📜loginSlice
 ┣ 📂store
 ┃ ┗ 📜index        // Redux Store for all slices
 ┣ 📂api
 ┃ ┗ 📜ccmsBase     // AXIOS BASE URL
 ┣ 📜App            // Root of component tree with ROUTING AND LAZY LOAD        
 ┗ 📜index        // ENTRY POINT COMPONENT 
```
## Author
- [Aakash Mishra](https://portfolio-aakash28.netlify.app/)
- [My Github ](https://github.com/Aakash-mishra2)
