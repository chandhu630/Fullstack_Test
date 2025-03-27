import { useState, useEffect } from "react";
import axios from "axios";

const GetImages = () => {
  const [images, setImages] = useState([]);

  // Fetch Images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <>
      <h3>Uploaded Images</h3>
      <div className="image-grid" style={styles.grid}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-card" style={styles.card}>
              <p>{image.filename}</p>
              <img
                src={image.imageUrl}
                alt={image.filename}
                style={styles.image}
              />
              <a
                href={image.imageUrl}
                download={image.filename}
                style={styles.downloadButton}
              >
                Download
              </a>
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </>
  );
};

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

export default GetImages;
