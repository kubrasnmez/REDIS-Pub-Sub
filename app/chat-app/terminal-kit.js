const term = require("terminal-kit").terminal;

const users = [
    [
        "NAME",
        "SURNAME",
        "EMAIL"
    ],
    [
        "A",
        "USER",
        "email@email.com"
    ], [
        "B",
        "USER",
        "email1@email.com"
    ], [
        "C",
        "USER",
        "email2@email.com"
    ],
    [
        "D",
        "USER",
        "email3@email.com"
    ],
]

/*Tanle Create*/

// term.table(users, {
//     hasBorder: true
// })


/*Line Changes */
// term.nextLine(1);
// term.previousLine(1);
// term.nextLine(1)

/* LOG */

// term.blue('Hello World!')
// term.nextLine(1);
// term.cyan.bold("Hello World")
// term.nextLine(1);
// term.cyan("Hello World")
// term.nextLine(1);
// term.red.italic("Hello World")
// term.nextLine(1);
// term.yellow.underline("Hello World")
// term.nextLine(1);
// term.green.blink("Hello World")
// term.nextLine(1);
// term.bell("Hello World")


/* INPUT */

// term.on("key", (key) => {
//     if (key === "CTRL_C") {
//         term.clear('');
//         process.exit(0);
//     }
// })

// term.inputField({
//     submitKey: 'Enter'
// }, (err, input) => {
//     if (err) {
//         term.red(err);
//         return
//     }
//     term.nextLine(1);
//     term.white(`You wrote ${input} `);
//     term.nextLine(1);

// })

/* YES NO QUESTION */

term.white("Yes or no ?");
term.nextLine(1);
term.yesOrNo({
    echoYes: false,
    echoNo: false
}, (err, arg) => {
    if (err) {
        term.red(err)
    }
    if (arg) {
        term.green("You said yes")
    }
    else {
        term.red("You said no")
    }
})

term.white("CLEAR ME");
term.clear();