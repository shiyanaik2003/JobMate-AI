/* =========================================
   JOB DATABASE
   ========================================= */

const jobs = [
    {
        id: 1,
        title: "UI/UX Design Intern",
        company: "ABC Technologies",
        location: "Panaji",
        skills: ["Figma", "UI/UX", "Wireframing"],
        availability: ["Evening", "Weekend"],
        salary: 7000,
        category: "Design",
        type: "Part-time",
        icon: "🎨",
        description:
            "We are looking for a student interested in UI/UX design to create wireframes, prototypes and visual designs."
    },

    {
        id: 2,
        title: "Frontend Developer Intern",
        company: "XYZ Solutions",
        location: "Remote",
        skills: ["HTML", "CSS", "JavaScript"],
        availability: ["Evening", "Weekend"],
        salary: 8000,
        category: "Development",
        type: "Part-time",
        icon: "💻",
        description:
            "Work on responsive websites and frontend interfaces using HTML, CSS and JavaScript."
    },

    {
        id: 3,
        title: "Social Media Designer",
        company: "Goa Creative Studio",
        location: "Panaji",
        skills: ["Figma", "Canva", "Graphic Design"],
        availability: ["Weekend"],
        salary: 6000,
        category: "Design",
        type: "Part-time",
        icon: "📱",
        description:
            "Create attractive social media posts, promotional graphics and digital content for clients."
    },

    {
        id: 4,
        title: "Content Writer",
        company: "Goa Startup",
        location: "Goa",
        skills: ["Content Writing", "English"],
        availability: ["Evening"],
        salary: 5500,
        category: "Content",
        type: "Part-time",
        icon: "✍️",
        description:
            "Write blogs, website content, social media captions and digital content."
    },

    {
        id: 5,
        title: "Junior Web Developer",
        company: "TechNova",
        location: "Remote",
        skills: ["HTML", "CSS", "JavaScript"],
        availability: ["Evening"],
        salary: 10000,
        category: "Development",
        type: "Part-time",
        icon: "🧑‍💻",
        description:
            "Assist the development team with website creation, testing and frontend improvements."
    },

    {
        id: 6,
        title: "Graphic Design Assistant",
        company: "Creative Minds",
        location: "Margao",
        skills: ["Canva", "Graphic Design", "Figma"],
        availability: ["Weekend"],
        salary: 6500,
        category: "Design",
        type: "Part-time",
        icon: "🖌️",
        description:
            "Support the design team by creating posters, graphics and promotional materials."
    },

    {
        id: 7,
        title: "Digital Marketing Assistant",
        company: "XYZ Media",
        location: "Panaji",
        skills: ["Canva", "Content Writing", "Marketing"],
        availability: ["Evening", "Weekend"],
        salary: 7000,
        category: "Marketing",
        type: "Part-time",
        icon: "📣",
        description:
            "Assist with social media management, content creation and basic digital marketing activities."
    }
];


/* =========================================
   USER DATA
   ========================================= */

let currentUser = {
    name: "",
    email: "",
    skills: ["Figma", "HTML", "CSS", "Python"],
    location: "Goa",
    availability: ["Evening"],
    preference: "Design",
    salary: 5000
};

let recommendedJobs = jobs.map(job => ({
    ...job,
    matchScore: 87,
    matchedSkills: []
}));

let applications = [];

let selectedJob = null;


/* =========================================
   LOGIN STATE
   ========================================= */

let isLoggedIn = false;


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(id) {

    // If user is logged out, prevent access to protected pages
    const protectedPages = [
        "profile",
        "recommendations",
        "details",
        "apply",
        "submitted",
        "applications",
        "assistant"
    ];

    if (!isLoggedIn && protectedPages.includes(id)) {
        id = "signup";
    }

    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Show requested page
    const element = document.getElementById(id);

    if (element) {
        element.classList.add("active");
    }

    // Load page-specific data
    if (id === "recommendations") {
        displayRecommendations();
    }

    if (id === "applications") {
        displayApplications();
    }

    updateNavigation();

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   NAVIGATION UPDATE
   ========================================= */

function updateNavigation() {

    const loginButton = document.querySelector(".login-link");
    const ctaButton = document.querySelector(".top-cta");

    if (!loginButton || !ctaButton) {
        return;
    }

    if (isLoggedIn) {

        // After login
        loginButton.textContent = "Log out";
        loginButton.onclick = logoutUser;

        ctaButton.textContent = "My Jobs";
        ctaButton.onclick = function () {
            showPage("recommendations");
        };

    } else {

        // Before login
        loginButton.textContent = "Log in";
        loginButton.onclick = function () {
            showPage("signup");
        };

        ctaButton.textContent = "Get Started";
        ctaButton.onclick = function () {
            showPage("signup");
        };
    }
}


/* =========================================
   LOGOUT
   ========================================= */

function logoutUser() {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmLogout) {
        return;
    }

    isLoggedIn = false;

    selectedJob = null;

    showPage("home");

    updateNavigation();
}


/* =========================================
   CREATE ACCOUNT / LOGIN
   ========================================= */

function createAccount() {

    const nameElement =
        document.getElementById("signupName");

    const emailElement =
        document.getElementById("signupEmail");

    const passwordElement =
        document.getElementById("signupPassword");

    if (!nameElement || !emailElement || !passwordElement) {
        return;
    }

    const name =
        nameElement.value.trim();

    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value.trim();


    // Check required fields
    if (!name || !email || !password) {

        alert("Please fill in all the fields.");

        return;
    }


    // Basic email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Save user information
    currentUser.name = name;
    currentUser.email = email;


    // Login user
    isLoggedIn = true;


    // Update greeting
    const greetingName =
        document.getElementById("greetingName");

    if (greetingName) {
        greetingName.textContent = name;
    }


    // Update avatar
    const avatar =
        document.querySelector(".avatar-btn");

    if (avatar) {
        avatar.textContent =
            name.charAt(0).toUpperCase();
    }


    // Update navigation immediately
    updateNavigation();


    // Go to profile setup
    showPage("profile");
}


/* =========================================
   SKILL PILLS
   ========================================= */

function initializeSkillPills() {

    document
        .querySelectorAll("#skillPills .pill")
        .forEach(button => {

            button.addEventListener("click", () => {

                button.classList.toggle("selected");

            });

        });
}


/* =========================================
   AVAILABILITY SELECTION
   ========================================= */

function initializeAvailability() {

    document
        .querySelectorAll(".availability")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".availability")
                    .forEach(element => {
                        element.classList.remove("active");
                        element.classList.remove("selected");
                    });


                button.classList.add("active");
                button.classList.add("selected");

            });

        });
}


/* =========================================
   GENERATE AI RECOMMENDATIONS
   ========================================= */

function generateRecommendations() {

    if (!isLoggedIn) {
        showPage("signup");
        return;
    }


    // Get selected skills
    const skills = [
        ...document.querySelectorAll(
            "#skillPills .pill.selected"
        )
    ].map(element => element.dataset.value);


    // Get availability
    const availability = [
        ...document.querySelectorAll(
            ".availability.active, .availability.selected"
        )
    ].map(element => {

        return element.dataset.value || "Evening";

    });


    // Get profile information
    const locationElement =
        document.getElementById("location");

    const preferenceElement =
        document.getElementById("preference");

    const salaryElement =
        document.getElementById("salary");


    const location =
        locationElement
            ? locationElement.value
            : "Goa";

    const preference =
        preferenceElement
            ? preferenceElement.value
            : "Design";

    const salary =
        salaryElement
            ? Number(salaryElement.value)
            : 5000;


    // Make sure at least one skill is selected
    if (!skills.length) {

        alert("Please select at least one skill.");

        return;
    }


    // Update current user
    currentUser.skills = skills;

    currentUser.availability =
        availability.length
            ? [...new Set(availability)]
            : ["Evening"];

    currentUser.location = location;

    currentUser.preference = preference;

    currentUser.salary = salary;


    /* -----------------------------------------
       Calculate job matching score
       ----------------------------------------- */

    recommendedJobs = jobs
        .map(job => {

            let score = 0;


            // Skill matching
            const matched =
                job.skills.filter(jobSkill =>

                    skills.some(
                        userSkill =>
                            userSkill.toLowerCase() ===
                            jobSkill.toLowerCase()
                    )

                );


            if (job.skills.length) {

                score +=
                    (matched.length /
                        job.skills.length) * 40;

            }


            // Location matching
            if (
                job.location.toLowerCase() ===
                    location.toLowerCase() ||
                job.location === "Remote" ||
                location === "Goa"
            ) {

                score += 20;

            }


            // Availability matching
            if (
                job.availability.some(
                    available =>
                        currentUser.availability.includes(
                            available
                        )
                )
            ) {

                score += 15;

            }


            // Category matching
            if (
                job.category.toLowerCase() ===
                preference.toLowerCase()
            ) {

                score += 15;

            }


            // Salary matching
            if (job.salary >= salary) {

                score += 10;

            } else if (job.salary >= salary * 0.8) {

                score += 5;

            }


            return {
                ...job,

                matchScore:
                    Math.round(
                        Math.min(score, 99)
                    ),

                matchedSkills: matched

            };

        })


        // Highest score first
        .sort(
            (a, b) =>
                b.matchScore - a.matchScore
        );


    // Update greeting
    const greetingName =
        document.getElementById("greetingName");

    if (greetingName) {
        greetingName.textContent =
            currentUser.name || "Siya";
    }


    // Open recommendations
    showPage("recommendations");
}


/* =========================================
   DISPLAY RECOMMENDATIONS
   ========================================= */

function displayRecommendations() {

    const list =
        document.getElementById("jobList");

    if (!list) {
        return;
    }


    list.innerHTML = "";


    // Number of matches
    const matchCount =
        document.getElementById("matchCount");

    if (matchCount) {

        matchCount.textContent =
            `${recommendedJobs.length} matches`;

    }


    // Create job cards
    recommendedJobs.forEach(job => {

        const card =
            document.createElement("article");

        card.className = "compact-job";


        card.innerHTML = `

            <div class="job-art">
                ${job.icon}
            </div>

            <h3>
                ${job.title}
            </h3>

            <div class="company">
                ${job.company}
            </div>

            <div class="job-meta">

                <span>
                    📍 ${job.location}
                </span>

                <span>
                    ₹${job.salary}/month
                </span>

                <span>
                    ${job.type}
                </span>

            </div>

            <div class="card-bottom">

                <span class="match-pill">
                    ${job.matchScore || 87}% MATCH
                </span>

                <button
                    class="small-btn"
                    onclick="viewJob(${job.id})"
                >
                    View
                </button>

            </div>
        `;


        list.appendChild(card);

    });
}


/* =========================================
   SEARCH JOBS
   ========================================= */

function filterJobs() {

    const search =
        document.getElementById("jobSearch");

    if (!search) {
        return;
    }


    const query =
        search.value.toLowerCase().trim();


    document
        .querySelectorAll(".compact-job")
        .forEach(card => {

            const matches =
                card.textContent
                    .toLowerCase()
                    .includes(query);


            card.style.display =
                matches ? "block" : "none";

        });
}


/* =========================================
   VIEW JOB DETAILS
   ========================================= */

function viewJob(id) {

    if (!isLoggedIn) {
        showPage("signup");
        return;
    }


    selectedJob =
        jobs.find(job => job.id === id);


    if (!selectedJob) {
        return;
    }


    const recommendation =
        recommendedJobs.find(
            job => job.id === id
        ) || selectedJob;


    const details =
        document.getElementById("jobDetails");

    if (!details) {
        return;
    }


    details.innerHTML = `

        <div class="detail-card">

            <div>

                <h2>
                    ${selectedJob.title}
                </h2>

                <div class="company">
                    ${selectedJob.company}
                </div>

                <div class="job-meta">

                    <span>
                        📍 ${selectedJob.location}
                    </span>

                    <span>
                        ₹${selectedJob.salary}/month
                    </span>

                    <span>
                        🕐 ${selectedJob.availability.join(" / ")}
                    </span>

                    <span>
                        💼 ${selectedJob.category}
                    </span>

                </div>

                <h3>
                    About the Role
                </h3>

                <p>
                    ${selectedJob.description}
                </p>

                <h3>
                    Required Skills
                </h3>

                <div class="skill-tags">

                    ${selectedJob.skills
                        .map(
                            skill =>
                                `<span>${skill}</span>`
                        )
                        .join("")}

                </div>

            </div>

            <aside class="detail-side">

                <div class="match-large">

                    <strong>
                        ${recommendation.matchScore || 87}%
                    </strong>

                    <span>
                        AI MATCH
                    </span>

                </div>

                <p>
                    Why this job matches you
                </p>

                <ul>

                    ${
                        (recommendation.matchedSkills || [])
                            .map(
                                skill =>
                                    `<li>${skill} matches your profile</li>`
                            )
                            .join("")
                        ||
                        "<li>Fits your selected preferences</li>"
                    }

                </ul>

                <button
                    class="primary-btn full"
                    style="margin-top:14px"
                    onclick="openApply(${selectedJob.id})"
                >
                    Apply Now →
                </button>

            </aside>

        </div>
    `;


    showPage("details");
}


/* =========================================
   OPEN APPLICATION PAGE
   ========================================= */

function openApply(id) {

    if (!isLoggedIn) {
        showPage("signup");
        return;
    }


    selectedJob =
        jobs.find(job => job.id === id);


    if (!selectedJob) {
        return;
    }


    const title =
        document.getElementById("applyJobTitle");

    const company =
        document.getElementById("applyCompany");


    if (title) {
        title.textContent =
            `Apply for ${selectedJob.title}`;
    }


    if (company) {
        company.textContent =
            selectedJob.company;
    }


    showPage("apply");
}


/* =========================================
   UPDATE RESUME
   ========================================= */

function updateResume() {

    const resume =
        document.getElementById("resume");

    const resumeName =
        document.getElementById("resumeName");


    if (!resume || !resumeName) {
        return;
    }


    const file =
        resume.files[0];


    if (file) {

        resumeName.textContent =
            file.name;

    }
}


/* =========================================
   SUBMIT APPLICATION
   ========================================= */

function submitApplication() {

    if (!isLoggedIn) {

        showPage("signup");

        return;
    }


    if (!selectedJob) {
        return;
    }


    // Avoid duplicate applications
    const alreadyApplied =
        applications.some(
            application =>
                application.id === selectedJob.id
        );


    if (!alreadyApplied) {

        applications.push({

            ...selectedJob,

            status: "Under Review",

            appliedAt:
                new Date().toLocaleDateString()

        });

    }


    const submittedText =
        document.getElementById("submittedText");


    if (submittedText) {

        submittedText.textContent =
            `Your application for ${selectedJob.title} at ${selectedJob.company} has been successfully submitted.`;

    }


    showPage("submitted");
}


/* =========================================
   DISPLAY APPLICATIONS
   ========================================= */

function displayApplications() {

    const list =
        document.getElementById("applicationList");

    if (!list) {
        return;
    }


    list.innerHTML = "";


    // No applications
    if (!applications.length) {

        list.innerHTML = `

            <div class="application-card">

                <div>

                    <h3>
                        No applications yet
                    </h3>

                    <p>
                        Apply to a recommended job to see it here.
                    </p>

                </div>

                <button
                    class="small-btn"
                    onclick="showPage('recommendations')"
                >
                    Find Jobs
                </button>

            </div>

        `;

        return;
    }


    // Display applications
    applications.forEach((job, index) => {

        const status =
            index === 0
                ? "Under Review"
                : index === 1
                    ? "Interview"
                    : "Shortlisted";


        const className =
            status === "Interview"
                ? "interview"
                : status === "Shortlisted"
                    ? "shortlisted"
                    : "under";


        const card =
            document.createElement("div");

        card.className =
            "application-card";


        card.innerHTML = `

            <div>

                <h3>
                    ${job.title}
                </h3>

                <p>
                    ${job.company}
                </p>

                <p>
                    Applied ${index + 2} days ago
                </p>

            </div>

            <span class="status ${className}">
                ${status}
            </span>

        `;


        list.appendChild(card);

    });
}


/* =========================================
   AI ASSISTANT
   ========================================= */

function askAssistant() {

    const input =
        document.getElementById("chatInput");

    const area =
        document.getElementById("chatArea");


    if (!input || !area) {
        return;
    }


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    // User message
    area.innerHTML += `

        <div class="user-message">
            ${escapeHtml(message)}
        </div>

    `;


    input.value = "";


    // AI response
    setTimeout(() => {

        area.innerHTML += `

            <div class="ai-message">
                ${generateAIResponse(message)}
            </div>

        `;


        area.scrollTop =
            area.scrollHeight;

    }, 350);
}


/* =========================================
   GENERATE AI RESPONSE
   ========================================= */

function generateAIResponse(message) {

    const text =
        message.toLowerCase();


    const topJob =
        recommendedJobs.length
            ? recommendedJobs[0]
            : jobs[0];


    // Recommendation
    if (
        text.includes("best") ||
        text.includes("recommend") ||
        text.includes("suitable")
    ) {

        return `

            Based on your profile,
            <b>${topJob.title}</b>
            has a
            <b>${topJob.matchScore || 87}%</b>
            match with your preferences.

        `;

    }


    // Skills
    if (text.includes("skill")) {

        return `

            Your selected skills are
            <b>${currentUser.skills.join(", ")}</b>.

        `;

    }


    // Salary
    if (
        text.includes("salary") ||
        text.includes("pay") ||
        text.includes("money")
    ) {

        return `

            Your salary expectation is
            <b>₹${currentUser.salary.toLocaleString()}/month</b>.

        `;

    }


    // Location
    if (
        text.includes("location") ||
        text.includes("where")
    ) {

        return `

            Your preferred location is
            <b>${currentUser.location}</b>.
            Remote jobs are also considered.

        `;

    }


    // Application
    if (
        text.includes("apply") ||
        text.includes("application")
    ) {

        return `

            Open a job card,
            choose <b>View</b>,
            then click <b>Apply Now</b>.

        `;

    }


    // Availability
    if (
        text.includes("time") ||
        text.includes("available") ||
        text.includes("availability")
    ) {

        return `

            Your selected availability is
            <b>${currentUser.availability.join(", ")}</b>.

        `;

    }


    // Default
    return `

        I can help you compare jobs,
        understand your match score,
        check skills, salary,
        availability and application steps.

    `;
}


/* =========================================
   CHAT ENTER KEY
   ========================================= */

function handleChatKey(event) {

    if (event.key === "Enter") {
        askAssistant();
    }
}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHtml(text) {

    return text.replace(
        /[&<>"']/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        }[character])

    );
}


/* =========================================
   INITIALIZATION
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // Start logged out
        isLoggedIn = false;

        // Initialize buttons
        initializeSkillPills();

        initializeAvailability();

        // Initial navigation
        updateNavigation();

        // Prepare recommendation data
        recommendedJobs =
            jobs.map(job => ({

                ...job,

                matchScore: 87,

                matchedSkills: []

            }));

        // Show home page
        showPage("home");

    }
);