/**
 * Bộ tổng hợp âm đa âm dùng Web Audio API.
 * Đây là lớp JS thuần, không phụ thuộc React.
 * Component chỉ gọi noteOn, noteOff, releaseAll và dispose.
 */

const A4_HZ = 440;
const A4_MIDI = 69;

/** Mức âm lượng thấp nhất dùng cho ramp hàm mũ, vì hàm mũ không thể đi tới 0. */
const MIN_GAIN = 0.0001;

const RESUME_FAILED_MESSAGE = "Không bật được âm thanh. Hãy bấm một phím lần nữa.";
const UNSUPPORTED_MESSAGE = "Trình duyệt này không hỗ trợ Web Audio API, nên không phát được âm thanh.";

/**
 * Lấy hàm khởi tạo AudioContext nếu trình duyệt hỗ trợ, ngược lại trả về null.
 * @returns {typeof AudioContext | null}
 */
function getAudioContextCtor() {
  return window.AudioContext || window.webkitAudioContext || null;
}

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
   * Kiểm tra trình duyệt có hỗ trợ Web Audio API không.
   * @returns {boolean}
   */
  static isSupported() {
    return getAudioContextCtor() !== null;
  }

  /**
   * @param {object} [options]
   * @param {number} [options.maxVoices=8] Số voice tối đa cùng lúc.
   * @param {OscillatorType} [options.waveform='triangle'] Dạng sóng.
   * @param {number} [options.attackSeconds=0.01] Thời gian tăng âm lượng.
   * @param {number} [options.releaseSeconds=0.04] Thời gian giảm âm lượng khi nhả phím (40 ms).
   * @param {number} [options.voiceGain=0.2] Âm lượng tối đa của mỗi voice.
   * @param {(count: number) => void} [options.onVoicesChange=() => {}] Gọi khi số nốt đang kêu thay đổi.
   * @param {(message: string | null) => void} [options.onError=() => {}] Gọi với thông báo lỗi, hoặc null khi phát được nốt.
   */
  constructor({
    maxVoices = 8,
    waveform = 'triangle',
    attackSeconds = 0.01,
    releaseSeconds = 0.04,
    voiceGain = 0.2,
    onVoicesChange = () => {},
    onError = () => {},
  } = {}) {
    this.maxVoices = maxVoices;
    this.waveform = waveform;
    this.attackSeconds = attackSeconds;
    this.releaseSeconds = releaseSeconds;
    this.voiceGain = voiceGain;
    this.onVoicesChange = onVoicesChange;
    this.onError = onError;

    /** @type {Map<number, { osc: OscillatorNode, gain: GainNode }>} midi → voice, giữ thứ tự chèn FIFO */
    this.voices = new Map();

    /** @type {AudioContext | null} */
    this.audioContext = null;
  }

  /**
   * Tạo AudioContext lười ở lần gọi đầu tiên, và gọi resume() nếu đang suspended.
   * Ném lỗi nếu trình duyệt không hỗ trợ.
   * @returns {AudioContext}
   */
  #ensureContext() {
    if (!this.audioContext) {
      const AudioCtor = getAudioContextCtor();
      if (!AudioCtor) {
        throw new Error(UNSUPPORTED_MESSAGE);
      }
      this.audioContext = new AudioCtor();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => this.onError(RESUME_FAILED_MESSAGE));
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

    try {
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
    } catch (error) {
      this.onError(error.message);
      return;
    }

    this.onError(null);
    this.onVoicesChange(this.voices.size);
  }

  /**
   * Nhả một nốt: giảm âm lượng theo hàm mũ về MIN_GAIN trong releaseSeconds,
   * rồi dừng dao động. Không làm gì nếu nốt không kêu.
   * @param {number} midi
   */
  noteOff(midi) {
    const voice = this.voices.get(midi);
    if (!voice) return;

    this.voices.delete(midi);

    const { osc, gain } = voice;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const endTime = now + this.releaseSeconds;

    // Hàm mũ không bắt đầu được từ 0, nên lấy giá trị hiện tại tối thiểu là MIN_GAIN.
    const startValue = Math.max(gain.gain.value, MIN_GAIN);

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(startValue, now);
    gain.gain.exponentialRampToValueAtTime(MIN_GAIN, endTime);

    osc.stop(endTime);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };

    this.onVoicesChange(this.voices.size);
  }

  /**
   * Nhả tất cả các nốt đang kêu.
   */
  releaseAll() {
    for (const midi of [...this.voices.keys()]) {
      this.noteOff(midi);
    }
  }

  /**
   * Tắt hết âm, chờ hết thời gian nhả, rồi đóng AudioContext.
   * Sau khi gọi, noteOn vẫn dùng được: AudioContext sẽ được tạo lại lười.
   * @returns {Promise<void>}
   */
  async dispose() {
    this.releaseAll();

    const ctx = this.audioContext;
    if (!ctx) return;

    await new Promise((resolve) => setTimeout(resolve, this.releaseSeconds * 1000));

    // Nếu trong lúc chờ có noteOn mới, dùng lại context này và không đóng nữa.
    if (this.voices.size > 0) return;

    this.audioContext = null;
    if (ctx.state !== 'closed') {
      await ctx.close();
    }
  }
}