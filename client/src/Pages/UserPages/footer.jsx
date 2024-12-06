import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#f8f9fa",
      padding: "40px 20px",
      color: "#333",
      fontFamily: "Arial, sans-serif",
      borderTop: "1px solid #ddd",
      marginTop: "auto", // Ensures the footer moves to the bottom
    },
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // Ensures the page stretches to full viewport height
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "15px",
      textTransform: "uppercase",
      color: "#555",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      marginBottom: "10px",
    },
    link: {
      textDecoration: "none",
      color: "#777",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#28a745",
    },
    topInfo: {
      borderBottom: "1px solid #ddd",
      paddingBottom: "20px",
      marginBottom: "20px",
    },
    col: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      color: "#444",
    },
    icon: {
      fontSize: "20px",
      color: "#28a745",
    },
    ml2: {
      marginLeft: "10px",
    },
    copyright: {
      borderTop: "1px solid #ddd",
      fontSize: "14px",
      color: "#777",
      display: "flex",
      alignItems: "center",
      paddingTop: "10px",
    },
    socials: {
      marginLeft: "auto",
      display: "flex",
      gap: "10px",
    },
    socialLink: {
      color: "#555",
      fontSize: "16px",
      transition: "color 0.3s ease",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <div style={styles.copyright} className="d-flex">
          <p className="mb-0">Example.bd. All rights reserved.</p>
          <ul style={styles.socials} className="list-inline">
            <li className="list-inline-item">
              <Link to="#" style={styles.socialLink}>
                <FaFacebookF />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#" style={styles.socialLink}>
                <FaTwitter />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#" style={styles.socialLink}>
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
