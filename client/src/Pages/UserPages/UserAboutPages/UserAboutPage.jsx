import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAboutPage() {
  const [images, setImages] = useState({ ImageOne: "", ImageTwo: "", ImageThree: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);

  // // Fetch images from the server
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:2004/upload");
  //       setImages(data);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };
  //   fetchImages();
  // }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Submit the images
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (selectedFiles.length !== 3) {
        alert("Please select exactly 3 images.");
        return;
      }
    
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("image", file));
    
      try {
        await axios.post("http://localhost:2004/about", formData); // Updated URL
        alert("Images uploaded successfully!");
        window.location.reload(); // Refresh to fetch the latest images
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    };
    
  return (
 <center>
     <div>
      <div style={{backgroundColor:'lightgreen'}}>
      <h1>Upload Slider Images</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" >
      <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                      />
                      <br />
                      <button type="submit">Upload</button>
                  </form>

      </div>
      <h2>Current Slider Images</h2>


{/* <div style={{backgroundColor:'#353535'}}>
<div style={{ marginLeft:'30px', }}>
 <img src={`http://localhost:2004/uploads/${images.ImageOne}`} alt="Image One"    style={{width:'900px',height:'200px' ,marginBottom:'10px' ,marginTop:'10px'}} />
 <br />
<img src={`http://localhost:2004/uploads/${images.ImageTwo}`} alt="Image Two"     style={{width:'900px',height:'200px',marginBottom:'10px'   }}/>
<br />
<img src={`http://localhost:2004/uploads/${images.ImageThree}`} alt="Image Three" style={{width:'900px',height:'200px',marginBottom:'10px'}}/>

      </div>
</div> */}
      </div>
</center>
   

  );
};

export default UserAboutPage