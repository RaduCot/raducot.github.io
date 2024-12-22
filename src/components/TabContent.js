import { useState, useEffect, useRef } from "react";
import { Frontend } from "./Frontend";
import { Music } from "./Music";
import { Design } from "./Design";
import { File } from "megajs";

export default function TabContent({ title }) {
  const [loading, setLoading] = useState(true); // Track loading state
  const [audioTracks, setAudioTracks] = useState([]); // Audio tracks with URLs and names
  const [images, setImages] = useState([]); // Images with URLs
  const hasFetchedTracks = useRef(false); // Ref to track if audio tracks have been fetched
  const hasFetchedImages = useRef(false); // Ref to track if images have been fetched

  useEffect(() => {
    const fetchAudioTracks = async () => {
      if (hasFetchedTracks.current) return; // Prevent multiple fetches
      hasFetchedTracks.current = true; // Mark as fetched

      const url = "https://mega.nz/folder/InADlDaQ#X4hI1iLB3bGxY9bDt_xRHw"; // Your shared folder URL
      const mainFile = File.fromURL(url);

      try {
        const folder = await mainFile.loadAttributes();
        if (folder.children) {
          const audioFiles = folder.children.filter(child =>
            child.name.endsWith(".mp3")
          );

          const audioData = await Promise.all(
            audioFiles.map(async (child) => {
              const downloadStream = await child.download();
              const chunks = [];
              for await (const chunk of downloadStream) {
                chunks.push(chunk);
              }
              const blob = new Blob(chunks, { type: "audio/mpeg" });
              return {
                name: child.name.replace(/\.[^/.]+$/, ""), // Remove file extension
                url: URL.createObjectURL(blob),
              };
            })
          );

          console.log(audioData);
          setAudioTracks(audioData.filter(Boolean)); // Filter out any aborted/null entries
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading audio tracks:", error);
      }
    };

    const fetchImages = async () => {
      if (hasFetchedImages.current) return; // Prevent multiple fetches
      hasFetchedImages.current = true; // Mark as fetched

      const url = "https://mega.nz/folder/U3g02CqI#zY2_L76fbbAiCp2pYRkFPw"; // Your shared folder URL
      const mainFile = File.fromURL(url);

      try {
        const folder = await mainFile.loadAttributes();
        if (folder.children) {
          const imageFiles = folder.children.filter(child =>
            child.name.endsWith(".jpg")
          );

          const imageData = await Promise.all(
            imageFiles.map(async (child) => {
              const downloadStream = await child.download();
              const chunks = [];
              for await (const chunk of downloadStream) {
                chunks.push(chunk);
              }
              const blob = new Blob(chunks, { type: "image/jpg" });
              return URL.createObjectURL(blob);
            })
          );

          setImages(imageData.filter(Boolean)); // Filter out any aborted/null entries
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    fetchAudioTracks();
    fetchImages();

    return () => {};
  }, []);

  return (
    <div className="">
      {title === "frontend" && <Frontend />}
      {title === "design" && <Design loading={loading} images={images} />}
      {title === "music" && <Music loading={loading} audioTracks={audioTracks} />}
    </div>
  );
}