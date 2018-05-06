import * as Tone from 'tone';

// TODO: 
// 1) start on one pad end on another css class still there

const synth = new Tone.Synth({
    oscillator: {
        type: 'sawtooth'
    }
})
    .toMaster();

const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();


document.addEventListener('DOMContentLoaded', main);

const NOTES = [
    'G4',
    'C4',
    'D4',
    'E4',
    /* Chords */
    '_Am',
    '_F',
    '_C',
    '_G',
];

const CHORD_MAP: { [key: string]: string[] } = {
    '_Am': ['A3', 'C4', 'E4'],
    '_F': ['F3', 'A3', 'C4'],
    '_C': ['C3', 'E3', 'G3'],
    '_G': ['G3', 'B3', 'D4'],
}

function main(): void {
    const pads = document.querySelector('.pads') as HTMLElement;

    const fragment = document.createDocumentFragment();
    NOTES.forEach(note => {
        const pad = document.createElement('div');
        pad.textContent = note;
        pad.classList.add('pads__pad');
        pad.dataset['note'] = note;
        fragment.appendChild(pad);
    });

    pads.appendChild(fragment);


    pads.addEventListener('mousedown', (e) => onStart(e.target as HTMLElement));
    pads.addEventListener('mouseup', (e) => onEnd(e.target as HTMLElement));
    pads.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onStart(e.target as HTMLElement);
    });
    pads.addEventListener('touchend', (e) => {
        onEnd(e.target as HTMLElement);
    });
}

function onStart(element: HTMLElement) {
    const data = element.dataset;
    const note = data['note'];
    if (!note) {
        return;
    }

    element.classList.add('active');

    if (note[0] === '_') {
        polySynth.triggerAttackRelease(CHORD_MAP[note], '6n');
    } else {
        synth.triggerAttackRelease(note, '8n');
    }

}

function onEnd(element: HTMLElement) {
    element.classList.remove('active');
}
