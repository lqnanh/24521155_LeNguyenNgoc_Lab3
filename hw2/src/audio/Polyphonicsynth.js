/**
 * Bộ tổng hợp âm đa âm dùng Web Audio API.
 * Đây là lớp JS thuần, không phụ thuộc React.
 * Component chỉ gọi noteOn, noteOff và releaseAll.
 */

const A4_HZ = 440;
const A4_MIDI = 69;

/**
 * Tần số (Hz) của một nốt MIDI theo f = 440 × 2^((midi − 69) / 12).
 * @param {number} midi
 * @returns {number}
 */
function midiToFreq(midi) {
  return A4_HZ * 2 ** ((midi - A4_MIDI) / 12);
}

export class PolyphonicSynth {
  /**
   * @param {object} [options]
   * @param {number} [options.maxVoices=8] Số voice tối đa cùng lúc.
   * @param {OscillatorType} [options.waveform='triangle'] Dạng sóng.
   * @param {number} [options.attackSeconds=0.01] Thời gian tăng âm lượng.
   * @param {number} [options.releaseSeconds=0.08] Thời gian tắt dần khi nhả phím.
   * @param {number} [options.voiceGain=0.2] Âm lượng tối đa của mỗi voice.
   */
  constructor({
    maxVoices = 8,
    waveform = 'triangle',
    attackSeconds = 0.01,
    releaseSeconds = 0.08,
    voiceGain = 0.2,
  } = {}) {
    this.maxVoices = maxVoices;
    this.waveform = waveform;
    this.attackSeconds = attackSeconds;
    this.releaseSeconds = releaseSeconds;
    this.voiceGain = voiceGain;

    /** @type {Map<number, { osc: OscillatorNode, gain: GainNode }>} midi → voice, giữ thứ tự chèn FIFO */
    this.voices = new Map();

    /** @type {AudioContext | null} */
    this.audioContext = null;
  }

  /**
   * Tạo AudioContext lười ở lần gọi đầu tiên, và gọi resume() nếu đang suspended.
   * @returns {AudioContext}
   */
  #ensureContext() {
    if (!this.audioContext) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtor();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Bắt đầu phát một nốt. Nếu nốt đang kêu thì bỏ qua.
   * Khi đủ maxVoices, tắt nốt cũ nhất (khóa đầu tiên của Map) trước khi tạo voice mới.
   * @param {number} midi
   */
  noteOn(midi) {
    if (this.voices.has(midi)) return;

    if (this.voices.size >= this.maxVoices) {
      const oldestMidi = this.voices.keys().next().value;
      this.noteOff(oldestMidi);
    }

    const ctx = this.#ensureContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = this.waveform;
    osc.frequency.setValueAtTime(midiToFreq(midi), now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.voiceGain, now + this.attackSeconds);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);

    this.voices.set(midi, { osc, gain });
  }

  /**
   * Nhả một nốt: đưa âm lượng về 0 rồi dừng dao động. Không làm gì nếu nốt không kêu.
   * @param {number} midi
   */
  noteOff(midi) {
    const voice = this.voices.get(midi);
    if (!voice) return;

    this.voices.delete(midi);

    const { osc, gain } = voice;
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + this.releaseSeconds);

    osc.stop(now + this.releaseSeconds);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  /**
   * Nhả tất cả các nốt đang kêu.
   */
  releaseAll() {
    for (const midi of [...this.voices.keys()]) {
      this.noteOff(midi);
    }
  }
}