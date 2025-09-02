const tabs = document.querySelectorAll("#aboutTabs li");
const content = document.getElementById("tabContent");

const tabData = {
  bio: `// bio
        Hello, I'm Hye Rim Jang, the developer of the backend.
        I have experience working as a UI/UX publisher,
        and I like to build an interactive environment between server work
        and front-end technology and databases.
        Currently studying full stack engineering methods with Vue/React.`,

  education: `// education
BS in Computer Science - Tech University (2018 - 2022)
Frontend Bootcamp - CodeAcademy (2022)`,

  contacts: `// contacts
📧 Email: michael@example.com
💼 LinkedIn: linkedin.com/in/michael-weaver
🐙 GitHub: github.com/michaelweaver`
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.getAttribute("data-tab");
    content.innerHTML = `<pre class="text-sm text-green-300">${tabData[selected]}</pre>`;
  });
});
