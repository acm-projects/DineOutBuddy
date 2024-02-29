import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to My Website</h1>
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Questionnare">Questionnare</a></li>
          </ul>
        </nav>
      </header>
      
      <footer className="home-footer">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
