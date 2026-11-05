// Dữ liệu cố định của 7 pad, nằm ngoài mọi component.
export const PADS = [
  { id: 'kick', name: 'Kick', shortcut: 'KeyW', sound: '/sounds/kick.wav' },
  { id: 'snare', name: 'Snare', shortcut: 'KeyA', sound: '/sounds/snare.wav' },
  { id: 'hihat', name: 'Hi-hat', shortcut: 'KeyS', sound: '/sounds/hihat.wav' },
  { id: 'clap', name: 'Clap', shortcut: 'KeyD', sound: '/sounds/clap.wav' },
  { id: 'tom', name: 'Tom', shortcut: 'KeyJ', sound: '/sounds/tom.wav' },
  { id: 'ride', name: 'Ride', shortcut: 'KeyK', sound: '/sounds/ride.wav' },
  { id: 'crash', name: 'Crash', shortcut: 'KeyL', sound: '/sounds/crash.wav' },
];

// Bảng tra phím (e.code) → pad, dùng khi bắt sự kiện bàn phím.
export const PADS_BY_CODE = new Map(PADS.map((pad) => [pad.shortcut, pad]));