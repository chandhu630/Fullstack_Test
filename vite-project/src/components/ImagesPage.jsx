import { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data); //  Now getting full image URLs
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token"); // Assuming token is stored after login

      const response = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setFile(null);
      fetchImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="container">
      <h2>Image Gallery</h2>

      {/* Upload section */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Image Gallery */}
      <h3>Uploaded Images</h3>
      <div className="image-grid" style={styles.grid}>
        {/* {images.map((image, index) => (
          <div key={index} className="image-card" style={styles.card}>
            <p>{image.filename}</p>
            <img
              src={image.imageUrl} //  Full image URL from backend
              alt={image.filename}
              style={styles.image}
            /> */}
            {/* Download Button */}
            {/* <a
              href={image.imageUrl}
              download={image.filename}
              style={styles.downloadButton}
            >
              Download
            </a> */}
          {/* </div>
        ))} */}
      </div>
    </div>
  );
};

// Styles
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
  },
  card: {
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    borderRadius: "5px",
  },
  downloadButton: {
    display: "inline-block",
    marginTop: "5px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ImageUpload;
