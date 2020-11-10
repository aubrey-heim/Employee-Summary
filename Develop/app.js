const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const Choice = require("inquirer/lib/objects/choice");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = []

function makeNewEmployee(){
    inquirer
    .prompt ([
        {
            type: "input",
            message: "What is their name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is their ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is their email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is their role?",
            name: "role"
        }
    ]).then(function(response){
        const {name, id, email, role} = response
        let newName = response.name;
        let newId = response.id;
        let newEmail = response.email;
        let newRole = response.role

        if (newRole === "Manager" || newRole === "manager"){
            inquirer
            .prompt ([
                {
                    type: "input",
                    message: "What is their office number?",
                    name: "officeNumber"
                },
            ]).then(function(response){
                const {officeNumber} = response
                let newEmployee = new Manager(newName, newId, newEmail, response.officeNumber)
                employees.push(newEmployee)
                inquirer
                .prompt ([
                    {
                        type: "checkbox",
                        message: "Would you like to add another employee?",
                        name: "add",
                        choices: ["yes", "no"]
                    },
                ]).then(function(response){
                    const {add} = response
                    if (response.add[0] === "yes"){
                        makeNewEmployee()
                    }else {
                        const page = render(employees)
                        fs.writeFile("./output/team.html", page, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Success!");
                })
                    }
                })
                
            });
            
        } else if (newRole === "Intern" || newRole === "intern"){
            inquirer
            .prompt ([
                {
                    type: "input",
                    message: "What is your school?",
                    name: "school"
                },
            ]).then(function(response){
                const{school} = response
                let newEmployee = new Intern(newName, newId, newEmail, response.school)
                employees.push(newEmployee)
                inquirer
                .prompt ([
                    {
                        type: "checkbox",
                        message: "Would you like to add another employee?",
                        name: "add",
                        choices: ["yes", "no"]
                    },
                ]).then(function(response){
                    const {add} = response
                    if (response.add[0] === "yes"){
                        makeNewEmployee()
                    }else {
                        const page = render(employees)
                        fs.writeFile("./output/team.html", page, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Success!");
                        })
                    }
                })
            });
            
        } else if (newRole === "Engineer" || newRole === "engineer"){
            inquirer
            .prompt ([
                {
                    type: "input",
                    message: "What is their GitHub username?",
                    name: "github"
                },
            ]).then(function(response){
                const{github} = response
                let newEmployee = new Engineer(newName, newId, newEmail, response.github)
                employees.push(newEmployee)
                inquirer
                .prompt ([
                    {
                        type: "checkbox",
                        message: "Would you like to add another employee?",
                        name: "add",
                        choices: ["yes", "no"]
                    },
                ]).then(function(response){
                    const {add} = response
                    if (response.add[0] === "yes"){
                        makeNewEmployee()
                    }else {
                        const page = render(employees)
                        fs.writeFile("./output/team.html", page, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Success!");
                        })
                    }
                })
            });
            
        } else {
            console.log("Employee role not recogized. Please try again.")
            makeNewEmployee()
        }
    });
}

makeNewEmployee()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
