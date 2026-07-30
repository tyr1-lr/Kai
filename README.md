<p align="center">
  <img src="frontend/public/logo.png" width="120">
</p>

<h1 align="center">Kai</h1>

<p align="center">
  A personal productivity workspace built with React, Django, and Gemini AI.
</p>

<p align="center">
  <a href="https://kai-sand.vercel.app">Live Demo</a> •
  <a href="https://github.com/Tjreyes27/Kai">Repository</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Django-6-092E20?logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white">
</p>

<hr>

<h2>Overview</h2>

<p>
Kai is a personal productivity web application that combines tasks, notes,
goals, a calendar, and an AI assistant into a single workspace.
</p>

<p>
The project was built to strengthen my full-stack development skills while
exploring AI integration with modern web technologies.
</p>

<hr>

<h2>Features</h2>

<ul>
  <li>Secure user authentication using JWT</li>
  <li>AI chat assistant powered by Gemini</li>
  <li>Task management</li>
  <li>Notes management</li>
  <li>Goal tracking</li>
  <li>Calendar with event management</li>
  <li>Password reset through email verification</li>
  <li>Responsive interface</li>
</ul>

<hr>

<h2>Tech Stack</h2>

<h3>Frontend</h3>

<ul>
  <li>React</li>
  <li>Vite</li>
  <li>Tailwind CSS</li>
  <li>Axios</li>
  <li>React Router</li>
</ul>

<h3>Backend</h3>

<ul>
  <li>Django</li>
  <li>Django REST Framework</li>
  <li>Simple JWT</li>
</ul>

<h3>Database</h3>

<ul>
  <li>SQLite</li>
</ul>

<h3>Deployment</h3>

<ul>
  <li>Frontend — Vercel</li>
  <li>Backend — Render</li>
</ul>

<hr>

<h2>Project Structure</h2>

<pre>
Kai
├── backend
├── frontend
├── .gitignore
└── README.md
</pre>

<hr>

<h2>Getting Started</h2>

<p>Clone the repository</p>

<pre><code>git clone https://github.com/Tjreyes27/Kai.git

cd Kai
</code></pre>

<p>Backend</p>

<pre><code>cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
</code></pre>

<p>Frontend</p>

<pre><code>cd frontend

npm install

npm run dev
</code></pre>

<hr>

<h2>Environment Variables</h2>

<pre><code>VITE_API_URL=http://127.0.0.1:8000
</code></pre>

<p>
The backend also requires a <code>.env</code> file containing your Gemini API key
and email configuration.
</p>

<hr>

<h2>Future Improvements</h2>

<ul>
  <li>AI memory</li>
  <li>Notifications</li>
  <li>File uploads</li>
  <li>PostgreSQL support</li>
  <li>Docker deployment</li>
</ul>

<hr>

<h2>Why I Built Kai</h2>

<p>
Kai started as a personal learning project. My goal was to build a complete
full-stack application while learning authentication, REST APIs, deployment,
and AI integration. Instead of creating separate tools for tasks, notes, and
scheduling, I combined them into a single workspace.
</p>

<hr>

<h2>License</h2>

<p>MIT License</p>
