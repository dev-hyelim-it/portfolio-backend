const projects = [
  {
    id: 1,
    title: "Project 1",
    tag: "React",
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "https://source.unsplash.com/400x225/?ui",
    tech: "react"
  },
  {
    id: 2,
    title: "Project 2",
    tag: "Vue",
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "https://source.unsplash.com/400x225/?tetris",
    tech: "vue"
  },
  {
    id: 3,
    title: "Project 3",
    tag: "Vue",
    desc: "Duis aute irure dolor in velit esse cillum dolore.",
    image: "https://source.unsplash.com/400x225/?car",
    tech: "vue"
  }
];

const grid = document.getElementById("projectGrid");

function renderProjects() {
  grid.innerHTML = "";
  const filters = [...document.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.id);

  projects.filter(p => filters.includes(p.tech.toLowerCase())).forEach(p => {
    grid.innerHTML += `
      <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img src="${p.image}" alt="${p.title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-indigo-400 font-bold">${p.title} <span class="text-gray-500">// _${p.tag.toLowerCase()}</span></h3>
          <p class="text-sm mt-2 mb-4">${p.desc}</p>
          <button class="px-4 py-1 border border-white text-white text-sm hover:bg-gray-700">view-project</button>
        </div>
      </div>`;
  });
}

document.querySelectorAll("input[type=checkbox]").forEach(cb =>
  cb.addEventListener("change", renderProjects)
);

renderProjects();
