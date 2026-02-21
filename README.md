# 🎵 Music Player | Web Music App

> A fully functional, responsive music player web application that streams real-time data from the Apple iTunes API. Built for the "Dark Vibe" aesthetic.

![Project Status](https://img.shields.io/badge/Status-Live-brightgreen) ![API](https://img.shields.io/badge/API-iTunes_Search-blue)

**song Player** is a custom JavaScript music interface that dynamically fetches songs, album art, and artist details. It features a robust audio engine built on the HTML5 `Audio` API, complete with a custom-coded progress bar, drag-and-drop volume control, and error handling for network streams.

## ✨ Key Features

* **Real-Time Data Fetching:** Uses the **iTunes Search API** to fetch high-resolution album art and audio previews (30s) instantly.
* **Custom Audio Engine:** * Bypasses default browser controls for a sleek, custom UI.
    * Event-driven logic handles buffering, playing, and pausing states without "interrupted" errors.
* **Interactive UI:**
    * **Draggable Volume Bar:** Click or drag to adjust volume with a visual "fill" indicator.
    * **Seekable Progress:** Click anywhere on the timeline to jump to that part of the song.
* **Dynamic Visuals:** Album art updates automatically based on the current track.
* **Responsive Design:** CSS Grid layout that works on desktop and tablets.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Variables, Flexbox, Grid)
* **Logic:** Vanilla JavaScript (ES6+, Async/Await)
* **Data Source:** Apple iTunes Search API (No Key Required)
* **Icons:** FontAwesome 6


## 🎧 How It Works (Under the Hood)

1.  **Fetching:** On load, `script.js` sends an asynchronous request to iTunes for terms like "Travis Scott".
2.  **Mapping:** The raw data is mapped into a clean `songList` array, extracting high-res images (`600x600`) and preview URLs.
3.  **The "Ghost Bar" Logic:** The volume and progress bars use `position: relative` containers with `absolute` fills to ensure smooth visual updates without layout shifts.
4.  **Event Listeners:** The player listens for the browser's native `timeupdate`, `waiting`, and `playing` events to sync the UI perfectly with the network status.

## 🔮 Future Roadmap

* [ ] Add a Search Bar to let users type any artist name. (already done)
* [ ] Add a "Repeat One" button feature.
* [ ] Mobile touch support for the progress slider.

## 👨‍💻 Author


* Aspiring Developer & Artist

---

*Built with 💜 and Code.*
