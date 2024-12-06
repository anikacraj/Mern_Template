import React from "react";
import Footer from "../UserPages/footer";
function Home() {
  return (
    <div className="page-container">
      <div className="content">
        <h3 className="text-6xl">Welcome to home page</h3>
      </div>
      <h1>home content</h1>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
