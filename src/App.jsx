import React, { useState, useRef } from 'react';
import './App.css';
import { videos } from './assets'; 
import gsap from 'gsap';
import Flip from 'gsap/Flip';

gsap.registerPlugin(Flip);

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRefs = useRef([]); 

  const handleVideoClick = (idx) => {
    const state = Flip.getState(".video__wrapper .vid__container");
    videoRefs.current.forEach((video) => video?.pause());
    if (selectedVideo === idx) {
      setSelectedVideo(null);
    } else {
      setSelectedVideo(idx);
      videoRefs.current[idx]?.play();
    }

    Flip.from(state, {
      duration: 0.2,
      ease: "power2.inOut",
      absolute: true
    });
  };

  return (
    <section className="section">
      <nav>
        <div>
          <h3>
            Tariq<br />Yunusa
          </h3>
        </div>
      </nav>
      <div className="redundant">
        <div className="video__wrapper">
          {videos.map((vid, idx) => (
            <div
              className={`vid__container ${
                selectedVideo === idx ? 'selected' : selectedVideo !== null ? 'thumbnail' : ''
              }`}
              key={idx}
              onClick={() => handleVideoClick(idx)}
            >
              <video
                src={vid}
                ref={(el) => (videoRefs.current[idx] = el)} 
                muted
                playsInline
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
