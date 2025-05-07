import { useState, useEffect } from "react";
import { Development } from "./Development";
import { Music } from "./Music";
import { Design } from "./Design";

export default function TabContent({ title }) {
  const [loading, setLoading] = useState(true);
  const [audioTracks, setAudioTracks] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        if (title === "music") {
          const audioContext = require.context(
            "../portfolio/audio",
            false,
            /\.mp3$/
          );
          const audioFiles = audioContext.keys().map((filePath) => {
            const fileName = filePath.replace("./", ""); // Get file name
            const file = audioContext(filePath);
            return {
              name: fileName.replace(".mp3", ""),
              base64: file,
            };
          });
          setAudioTracks(audioFiles);
        } else if (title === "design") {
          const imageContext = require.context(
            "../portfolio/img",
            false,
            /\.(jpg|jpeg|png)$/
          );
          const imageFiles = imageContext.keys().map((filePath) => {
            const fileName = filePath.replace("./", ""); // Get file name
            const file = imageContext(filePath);
            return {
              name: fileName.replace(/\.[^/.]+$/, ""), // Remove extension
              base64: file,
            };
          });
          setImages(imageFiles);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading local data:", error);
        setLoading(false);
      }
    };

    if (title === "music" || title === "design") {
      fetchLocalData();
    }

    return () => {};
  }, [title]); // Dependency array includes title to run when title changes

  return (
    <div className="">
      {title === "development" && <Development />}
      {title === "design" && <Design loading={loading} images={images} />}
      {title === "music" && <Music loading={loading} audioTracks={audioTracks} />}
    </div>
  );
}