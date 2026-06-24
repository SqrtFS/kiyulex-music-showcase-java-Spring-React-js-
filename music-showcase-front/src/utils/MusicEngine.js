import * as Tone from 'tone';

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export class MusicEngine {
    static stopAll() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    }

    constructor(seed) {
        this.seed = seed;
        this.random = mulberry32(seed);
        this.isPlaying = false;
        
        this.synths = [];
        this.parts = [];
        
        this.setupTrack();
    }

    setupTrack() {
        const tempos = [90, 105, 120, 135, 150];
        this.tempo = tempos[Math.floor(this.random() * tempos.length)]; 
        
        const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const rootNote = roots[Math.floor(this.random() * roots.length)];
        
        this.scale = [
            `${rootNote}3`, 
            Tone.Frequency(`${rootNote}3`).transpose(3).toNote(), 
            Tone.Frequency(`${rootNote}3`).transpose(5).toNote(), 
            Tone.Frequency(`${rootNote}3`).transpose(7).toNote(), 
            Tone.Frequency(`${rootNote}3`).transpose(10).toNote(),
            `${rootNote}4` 
        ];

        this.melodySynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: this.random() > 0.5 ? 'triangle' : 'square' },
            envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 1 }
        }).toDestination();
        this.synths.push(this.melodySynth);

        this.kickDrum = new Tone.MembraneSynth().toDestination();
        this.synths.push(this.kickDrum);

    }

    generatePatterns() {
        const melodySteps = [];
        for (let i = 0; i < 16; i++) {
            if (this.random() > 0.6) {
                const note = this.scale[Math.floor(this.random() * this.scale.length)];
                melodySteps.push({ time: `0:${Math.floor(i/4)}:${i%4}`, note: note, dur: '16n' });
            }
        }

        const melodyPart = new Tone.Part((time, value) => {
            this.melodySynth.triggerAttackRelease(value.note, value.dur, time);
        }, melodySteps).start(0);
        melodyPart.loop = true;
        melodyPart.loopEnd = "1m"; 
        this.parts.push(melodyPart);

        const kickSteps = [];
        const isFourOnTheFloor = this.random() > 0.5;
        
        for (let i = 0; i < 16; i++) {
            if (isFourOnTheFloor && i % 4 === 0) {
                kickSteps.push({ time: `0:${Math.floor(i/4)}:${i%4}` });
            } else if (!isFourOnTheFloor && (i === 0 || i === 6 || i === 10)) {
                kickSteps.push({ time: `0:${Math.floor(i/4)}:${i%4}` });
            }
        }

        const kickPart = new Tone.Part((time) => {
            this.kickDrum.triggerAttackRelease("C1", "8n", time);
        }, kickSteps).start(0);
        kickPart.loop = true;
        kickPart.loopEnd = "1m";
        this.parts.push(kickPart);
    }

    async play() {
        if (this.isPlaying) return;

        await Tone.start();

        this.parts.forEach(part => part.dispose());
        this.parts = [];
        

        this.generatePatterns();

        Tone.Transport.bpm.value = this.tempo;
        Tone.Transport.start();

        this.isPlaying = true;
    }

    stop() {
        if (this.isPlaying) {
            Tone.Transport.stop();
            Tone.Transport.cancel();
            this.isPlaying = false;
        }
    }

    dispose() {
        this.stop(); 
        this.parts.forEach(part => part.dispose());
        this.synths.forEach(synth => synth.dispose());
    }
}