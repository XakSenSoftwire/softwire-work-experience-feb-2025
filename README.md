# Softwire Work Experience 2025

## General Setup
1. Sign into your/create a new [GitHub](https://github.com/signup) account.
2. Send your GitHub username and email to `xak.sen@softwire.com`
3. Sign into your/create a new [Trello](https://id.atlassian.com/signup?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%252F%26display%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D%26aaOnboarding%3D%26updateEmail%3D%26traceId%3D%26ssoVerified%3D%26createMember%3Dtrue%26jiraInviteLink%3D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D) account
4. Here is the [Trello board](https://trello.com/invite/b/67ab6afb59b643271d16d90a/ATTIea18b0eacececb17b89dca60b2976d4dDB9CD017/softwire-work-exp-feb-2025). We will be using this to manage the progress of your project - make sure you have access to view it.
5. Check you can view [this deployed site](https://softwire-work-experience-feb-2025-opal.vercel.app/). It should be a blank site with `Hello World!` written in black text in the top left.
6. Install [VSCode](https://code.visualstudio.com/download) - you can choose a different IDE if you've used it before but it may cause you some issues with the rest of the setup.
7. Install [Git](https://git-scm.com/downloads/win)
8. Install [docker](https://docs.docker.com/desktop/setup/install/windows-install/). You will need to restart your computer. Afterwards, you'll automatiically download WSL as part of the docker installation. Once that is installed, open the Docker Desktop App and it should say "Your running containers show up here" - this means it is y to go!
9. **[Optional]** Install your preferred search engine (e.g. Chrome, Firefox)

> Don't be scared to ask Xak or Wendi for help :)

## Connect Git to your GitHub account
So that you can contribute to the project, you have to connext Git to your own account.
1. Open Powershell - this is where you can give commands to instruct your computer on setting up your account configuration settings as well as things like setting up the repository!
2. Run the following commands in the Powershell command line
```
git config --global user.name "<Your Name>"
git config --global user.email "youremail@gmail.com"
```
3. Check your details are correct by running the following commands
```
git config --global user.name
git config --global user.email
``` 

## Cloning a repo
We all need to create a local copy of the code before you can make changes to it on your computer.
1. Open Powershell
2. Navigate to your local documents folder using the commands `ls` to list the possible paths to follow and `cd <PATH NAME>` to choose a path to follow. 
3. Find the repository web URL from the GitHub repository as shown in the image below: `GitHub repository > Code > Copy url to clipboard`. The Tetris repository, which you will need to clone for the project, can be found at [this URL](https://github.com/XakSenSoftwire/softwire-work-experience-feb-2025).

![Clone repo image](course-assets/clone-repo.png)

4. To create a local copy of the codebase for your development purposes, execute the following code
```
git clone <REPO WEB URL>
```

## Open the project in VS Code
On the same powershell window, in the same directory, execute the following command
```
code softwire-work-experience-feb-2025
```
This tells VS Code (`code`) to open the new folder `softwire-work-experience-feb-2025`.
You should now see the project in VS Code.

It is important that when your VSCode is open, turn on Autosave to make Docker's hotreload function as intended. Go to `File > Autosave`. There should be a tick displayed to show it is on.

## Add Git Graph VS Code extension (optional but recommended)
This extension helps us visualise the git history.

- Open VS Code
- Click the extension tab on the left panel
- Search for "Git Graph"
- Click "Install"

Now when you open the Source Control tab on the left, you have the option to see the git history.

## Running Tetris Locally
1. Open the Docker Desktop App 
2. Navigate to the root of the repository (i.e. `..\softwire-work-experience-feb-2025`).
3. Run the command `$ docker-compose up` in the terminal to start all 3 services (frontend, backend, database)
4. Check you have access to the frontend by navigating to `http://localhost:8080` in your browser

TIP: *Pressing CTRL+C in the terminal sends a signal to stop whatever application is currently running*

If you would like control of your terminal instead, run `$ docker-compose up -d` to run them in the background. Make sure to run `$ docker-compose down` when you want them to stop

 ## How to Contribute Code

Git can be a bit confusing if you're using it for the first time. If you're unsure about any step, feel free to grab either of us and we can go over it.

### Working on a Feature

You will not be able to make changes on the `main` branch, this branch should always only contain code that has been reviewed. Development work should be done on a feature branch. However, don't worry if you accidentally work on `main`! Just let us know and we'll help you move it over to a feature branch.

- Make sure you are on the `main` branch and that it is up to date:
    - `git checkout main`
    - `git pull`
- Create a branch for your feature:
    - `git checkout -b [your-own-feature-branch-name]`
    NB: it's important, especially using Powershell, to name your branch using [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) syntax convention
- Make some code changes
- Add your changes:
    - (if you want to check what changes you have): `git status`
    - `git add [yourFiles.example]`
    - `git commit -m "sensible message here, e.g. add a line piece to the library"`
    - You can (and probably should) do this process multiple times on your branch as you gradually add code to acheive the feature
- Push the changes to GitHub:
    - If it's the first time you have pushed this branch:
        - `git push --set-upstream origin [your-own-feature-branch-name]`
    - If you have pushed this branch before:
        - `git push`

**Task:** Set up a feature branch called "test-commit-[your-name]". Change `Hello World!` to `Hello Reviewer!` in `frontend/pages/index.html`. Push your commit to the online repository. This is good practice and useful to check you are set up correctly with the next step.

### Requesting a Review

Once you are happy with your code, you can open GitHub in a browser and do the following:
- Navigate to the page for the repository
- Select "Pull requests" in the bar at the top
- Click the "New pull request" button
- Set the branches as follows:
    - base: `main` (this should be the default)
    - compare: `your-own-feature-branch-name`
- Click "Create pull request"
- Add a sensible title and description of your changes, then click "Create pull request"
- Either Xak or Wendi will then review your changes and either make some comments or approve it:
    - If we make comments, you can make the changes on your branch locally and `git push` to update the code in GitHub
    - If we approve it, we can merge it into `main`. Wahey!

**Task:** Set up a pull request called "test-commit-[your-name]". If you can do this, you're set up correctly! Xak, who will be reviewing the pull request, will tell you if its working correctly from his GitHub.

## Useful Links

### Project Resources
- [Trello board](https://trello.com/invite/b/67ab6afb59b643271d16d90a/ATTIea18b0eacececb17b89dca60b2976d4dDB9CD017/softwire-work-exp-feb-2025) - to keep track of tasks and their statuses
- [Github repository](https://github.com/XakSenSoftwire/softwire-work-experience-feb-2025) - central location for all of our code
- [Live site](https://softwire-work-experience-feb-2025-git-w-c7f8f8-wendifs-projects.vercel.app/)

### Starting Exercises Links
- [Free-form coding environment](https://liveweave.com/#)
- [HTML/CSS Fundamentals](https://www.freecodecamp.org/learn/2022/responsive-web-design)
- [JavaScript Fundamentals](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/)
- [CSS Flexbox Exercises](https://flexboxfroggy.com/)
- [JavaScript FizzBuzz](https://codingdojo.org/kata/FizzBuzz/)
- [Git Fundamentals](https://learngitbranching.js.org/)
- Ask us!

### Useful HTML/CSS/JavaScript Guides

- [HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [CSS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [CSS flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [JavaScript basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [Git cheatsheet](https://education.github.com/git-cheat-sheet-education.pdf)

### Further ing for backend development
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [HTTP response codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
