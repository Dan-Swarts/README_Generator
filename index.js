// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs, { link, write } from 'fs';



// TODO: Create an array of questions for user input
const questions = [
    {
        message: "what is your project called?",
        name: "name",
        default: "My Project"
    },  
    {
        message: "Provide a short description. Why did you build this project? What problem does it solve? What did you learn?",
        name: "description",
        default: "Description"
    },

    {
        message: "Do you want a table of contents to be automatically generated?",
        type: "confirm",
        name: "contents",
        default: true
    },

    {
        message: "Installation: what is step 1 for installing your project? (1/3)",
        name: "installation1",
        default: "step 1"
    },

    {
        message: "Installation: what is step 2 for installing your project? (2/3)",
        name: "installation2",
        default: "step 2"
    },

    {
        message: "Installation: what is step 3 for installing your project? (3/3)",
        name: "installation3",
        default: "step 3"
    },

    {
        message: "Usage: what is step 1 for using the project? (1/3)",
        name: "usage1",
        default: "step 1"
    },
    {
        message: "Usage: what is step 2 for using the project? (2/3)",
        name: "usage2",
        default: "step 2"
    },
    {
        message: "Usage: what is step 3 for using the project? (3/3)",
        name: "usage3",
        default: "step 3"
    },

    {
        message: "Who are your collaborators?",
        name: "credits",
        default: "you, me, them"
    },

    {
        message: "Which license do you want to use?",
        type: "list",
        choices: ["Apache-2.0","GNU-GPL-2.0","GNU-GPL-3.0","ISC","MIT"],
        name: "license",
        default: "MIT"
    },

    {
        message: "Which badge(s) do you want to apply to the project?",
        type: "checkbox",
        choices: ["Javascript","HTML","CSS"],
        name: "badges",
        default: "Javascript"
    },

    {
        message: "List the features of your project: (1/3)",
        name: "feature1",
        default: "feature 1"
    },

    {
        message: "List the features of your project: (2/3)",
        name: "feature2",
        default: "feature 2"
    },

    {
        message: "List the features of your project: (3/3)",
        name: "feature3",
        default: "feature 3"
    },

    {
        message: "Do you want to invite others to contribute to the project?",
        type: "confirm",
        name: "contribute",
        default: true
    },

    {
        message: "What tests do you have for users to make sure it's working? (1/3)",
        name: "test1",
        default: "test 1"
    },

    {
        message: "What tests do you have for users to make sure it's working? (2/3)",
        name: "test2",
        default: "test 2"
    },
    {
        message: "What tests do you have for users to make sure it's working? (3/3)",
        name: "test3",
        default: "test 3"
    },
    {
        message: "Link your GitHub:",
        name: "gitHubLink",
        default: "github.com"
    },
    {
        message: "What is your Email?",
        name: "email",
        default: "example@something.com"
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    let tableString = '';
    let credits = '';
    let contribute = '';
    let badges = '';

    if(data.contents && data.contribute){
        tableString = `
## 📁 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tests](#tests)
- [Credits](#credits)
- [Contributing](#contributing)
- [License](#license)
`;
    } else if (data.contents){
        tableString = `
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)
`;
    }

    if(data.contribute){
        contribute =  `
## Contributing

> [!IMPORTANT]
> Whether you have feedback on features, have encountered any bugs, or have suggestions for enhancements, we're eager to hear from you. Your insights help us make the ${data.name} library more robust and user-friendly.

Please feel free to contribute by [submitting an issue](https://github.com) or [joining the discussions](https://github.com). Each contribution helps us grow and improve.

We appreciate your support and look forward to making our product even better with your help!

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.
`;
    }

    data.credits.split(',').forEach(credit => {
        credits = credits + `- [${credit}](https://github.com)\n`
    });

    const badgeMap = {
        'Javascript': '![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)',
        'HTML': '![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)',
        'CSS': '![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)',
        'MIT': '![MIT License](https://img.shields.io/badge/License-MIT-green)',
        'Apache-2.0':'![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-blue)',
        'GNU-GPL-3.0':'![GNU GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue)',
        'GNU-GPL-2.0':'![GNU GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue)',
        'ISC':'![ISC License](https://img.shields.io/badge/License-ISC-blue)'
    };

    badges = badges + `${badgeMap[data.license]} `

    data.badges.forEach((badge) => {
        badges = badges + `${badgeMap[badge]} `;
    });

    let readMeString = 

`# ${data.name}
${badges}
## Description

${data.description}
${tableString}
## Installation

- ${data.installation1}
\`\`\`shell
# Installation instructions 1

\`\`\`
- ${data.installation2}
\`\`\`shell
# Installation instructions 2

\`\`\`
- ${data.installation3}
\`\`\`shell
# Installation instructions 3

\`\`\`

## Usage

- ${data.usage1}\n
![Add a screenshot](./relative/path/to/img.jpg?raw=true)

- ${data.usage2}\n
![Add a screenshot](./relative/path/to/img.jpg?raw=true)

- ${data.usage3}\n
![Add a screenshot](./relative/path/to/img.jpg?raw=true)

## Features

- ${data.feature1}

- ${data.feature2}

- ${data.feature3}

## Tests

- ${data.test1}
\`\`\`shell
# How to run the first test

\`\`\`
- ${data.test2}
\`\`\`shell
# How to run the second test

\`\`\`
- ${data.test3}
\`\`\`shell
# How to run the third test

\`\`\`

## Questions
If you have any questions about ${data.name}, contact me at ${data.email}. 

Check out my other projects at ${data.gitHubLink}.

## Credits

${credits}
${contribute}
## License`;

    fs.readFile(`./licenses/${data.license}.txt`,'utf-8',(err,txt) =>{
        readMeString = readMeString + `
\`\`\`
${txt}
\`\`\``
        fs.writeFile(fileName,readMeString,(err) => {
            err? console.log(err) : console.log('sucess!');
        });
    });
}

// TODO: Create a function to initialize app
function init() {

    inquirer
        .prompt(questions)
        .then((response) => writeToFile('./example/README.md',response));

}

// Function call to initialize app
init();
