// import jsonfile from "jsonfile";
// import moment from "moment";
// import simpleGit from "simple-git";
// import random from "random";

// const path = "./data.json";
// const git = simpleGit();

// const makeCommits = async (n) => {
//   if (n === 0) {
//    await git.push('origin', 'main', { '--force': null });
//     console.log("✅ All commits pushed!");
//     return;
//   }

//   const x = random.int(0, 54); // weeks
//   const y = random.int(0, 6);  // days

//   const date = moment()
//     .subtract(1, 'y')
//     .add(1, 'd')
//     .add(x, 'w') // horizontally
//     .add(y, 'd') // vertically
//     .format();

//   const data = { date };
//   console.log("📅 Committing date:", date);

//   try {
//     // Write to file
//     await jsonfile.writeFile(path, data);

//     // Add, commit with date
//     await git.add([path]);
//     await git.commit(date, { '--date': date });

//     // Recursive call
//     makeCommits(n - 1);
//   } catch (err) {
//     console.error("❌ Error during commit:", err);
//   }
// };

// makeCommits(100);










import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
    if (n === 0) {
        try {
            // Force push to GitHub
            await git.push('origin', 'main', { '--force': null });
            console.log("✅ All commits force pushed to GitHub.");
        } catch (err) {
            console.error("❌ Error during final push:", err);
        }
        return;
    }

    const x = random.int(0, 54); // horizontal weeks
    const y = random.int(0, 6);  // vertical days

    //   const date = moment()
    //     .subtract(1, 'y')
    //     .add(1, 'd')
    //     .add(x, 'w')
    //     .add(y, 'd')
    //     .format();
    const date = moment()
        .startOf('year')     
        .add(x, 'w')           
        .add(y, 'd')           
        .format();

    const data = {
        date,
        random: Math.random() // ensures content changes each time
    };

    console.log(`📅 Committing date: ${date} (${n} left)`);

    try {
        // Write to data.json
        await jsonfile.writeFile(path, data);

        // Commit with custom date
        await git.add([path]);
        await git.commit(date, { '--date': date });

        // Recursive call
        await makeCommits(n - 1);
    } catch (err) {
        console.error("❌ Error during commit:", err);
    }
};

// Generate 100 commits
makeCommits(100);
