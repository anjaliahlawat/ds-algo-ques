// //  Design a muscial jukebox using object oriented principles.

// // The jukebox should be able to play, pause, resume and stop a song.

// class Jukebox {
//     library: MusicLibrary
//     player: AudioPlayer
//     queue: SongQueue
//     creditSystem: CreditSystem
    

//     constructor(library, player, queue, creditSystem) {
//         this.library = library;
//         this.player = player;
//         this.queue = queue;
//         this.creditSystem = creditSystem;
//     }

//     selectSong(user, song) {
//         if (!this.creditSystem.deduct(user.id)) {
//             console.log("❌ Not enough credits");
//             return;
//         }

//         const songfromLibrary = this.library.search(song);
//         if (!songfromLibrary) {
//             console.log("❌ Song not found");
//             return;
//         }

//         this.queue.enqueue(songfromLibrary);
//         console.log(`🎵 ${song.title} added to queue by ${user.name}`);
//     }

//     playNext() {
//     if (this.queue.isEmpty()) {
//       console.log("Queue empty");
//       return;
//     }

//     const song = this.queue.dequeue();
//     this.player.play(song);
//   }

// }

// class MusicLibrary {
//     songs: Song[]

//     constructor() {
//         this.songs = [];
//     }

//     search(query: string): Song[] {
//         return this.songs.filter(song => song.title.includes(query) || song.artist.includes(query));
//     }

//     addSong(song: Song) {
//         this.songs.push(song);
//     }

//     removeSong(song: Song) {}
// }



// class Song {
//     id: number
//     title: string
//     artist: string
//     duration: number

//     constructor(id: number, title: string, artist: string, duration: number) {
//         this.id = id;
//         this.title = title;
//         this.artist = artist;
//         this.duration = duration;
//     }
// }

// class SongQueue {
//   queue: Song[]
//   constructor() {
//     this.queue = [];
//   }

//   enqueue(song) {
//     this.queue.push(song);
//   }

//   dequeue() {
//     return this.queue.shift();
//   }

//   isEmpty() {
//     return this.queue.length === 0;
//   }
// }

// // -------- Audio Player --------
// class AudioPlayer {
//   currentSong: Song | null
//   state: string

//   constructor() {
//     this.currentSong = null;
//     this.state = "STOPPED";
//   }

//   play(song) {
//     this.currentSong = song;
//     this.state = "PLAYING";
//     console.log(`▶️ Playing: ${song.title} by ${song.artist}`);
//   }

//   pause() {
//     if (this.state === "PLAYING") {
//       this.state = "PAUSED";
//       console.log("⏸ Paused");
//     }
//   }

//   resume() {
//     if (this.state === "PAUSED") {
//       this.state = "PLAYING";
//       console.log("▶️ Resumed");
//     }
//   }

//   stop() {
//     this.state = "STOPPED";
//     this.currentSong = null;
//     console.log("⏹ Stopped");
//   }
// }

// class User {
//     id: number
//     name: string

//     constructor(id: number, name: string) {
//         this.id = id;
//         this.name = name;
//     }
// }

// class CreditSystem {
//   credits: Map<number, number>
//   constructor() {
//     this.credits = new Map();
//   }

//   addCredits(userId, amount) {
//     this.credits.set(userId, (this.credits.get(userId) || 0) + amount);
//   }

//   hasCredit(userId) {
//     return (this.credits.get(userId) || 0) > 0;
//   }

//   deduct(userId) {
//     if (!this.hasCredit(userId)) return false;
//     this.credits.set(userId, this.credits.get(userId) - 1);
//     return true;
//   }
// } 

// const library = new MusicLibrary();
// library.addSong(new Song(1, "Song A", "Artist A", 300));
// library.addSong(new Song(2, "Song B", "Artist B", 250));

// const user = new User(1, "Alice");

// const jukebox = new Jukebox(
//   library,
//   new AudioPlayer(),
//   new SongQueue(),
//   new CreditSystem()
// );

// jukebox.creditSystem.addCredits(user.id, 2);
// jukebox.selectSong(user, 1);
// jukebox.selectSong(user, 2);

// jukebox.playNext();
// jukebox.playNext();