// packages needed for application
const inquirer = require("inquirer");
const fs = require("fs");

const generateHtml = require("./util/generateHtml");

let {Employee} = require("./lib/Employee");
let {Manager} = require("./lib/Manager");
let {Engineer} = require("./lib/Engineer");
let {Intern} = require("./lib/Intern");

let teamArr = [];

// function to add a team member or quit
async function askQuestion() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["Add a team member", "Quit"],
         },
    ]);
    switch (answer.choice) {
        case "Add a team member": {
            return await chooseTeamMember();
        }
        default: {
            return console.log("Done creating team.");
        }
    }
}

// function to choose to add manager, engineer, intern, or quit
async function chooseTeamMember() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            message: "Add a member to your team?",
            name: "choice",
            choices: ["Manager", "Engineer", "Intern", "Quit"],
         },
    ]);
    switch (answer.choice) {
        case "Manager": {
            return createManager();
        }
        case "Engineer": {
            return createEngineer();
        }
        case "Intern": {
            return createIntern();
        }
        default: {
            return askQuestion();
        }
    }
}

/* function to create a manager by getting name, id, email, and office number
push new manager to team array */
async function createManager() {
    if(teamArr.length !== 0){
        console.log("There can only be one manager!");
        return askQuestion();
    }
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the managers name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the managers id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the managers email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the managers office number?",
            name: "officeNumber",
        },
    ]);
    let newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
    teamArr.push(newManager);
    return askQuestion();
}

/* function to create an engineer by getting name, id, email, and github username
push new engineer to team array */
async function createEngineer() {
    if(teamArr.length === 0){
        console.log("Please add a manager first!");
        return askQuestion();
    }
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the engineers name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the engineers id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the engineers email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the engineers GitHub username?",
            name: "github",
        },
    ]);
    let newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
    teamArr.push(newEngineer);
    return askQuestion();
}

/* function to create an intern by getting name, id, email, and school
push new intern to team array */
async function createIntern() {
    if(teamArr.length === 0){
        console.log("Please add a manager first!");
        return askQuestion();
    }
    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What is the interns name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the interns id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the interns email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the interns school?",
            name: "school",
        },
    ]);
    let newIntern = new Intern(answer.name, answer.id, answer.email, answer.school);
    teamArr.push(newIntern);
    return askQuestion();
}

// A function to write html file
function writeToFile(fileName, data) {

    fs.writeFile(`./output/${fileName}.html`, data, (err) => {
        if(err){
            throw err
        }
        console.log("success")
    })
}

// A function to initialize app
async function init() {
    await askQuestion();
    writeToFile("generateTeam", generateHtml.team(teamArr));
}

// Function call to initialize app
init();