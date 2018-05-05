import * as Tone from 'tone';

// TODO: 
// 1) start on one pad end on another css class still there

const sampler = new Tone.Sampler(
    {
        'C3': '/kick.mp3',
        'D3': '/snare.mp3',
        'E3': '/hh.mp3',
        'F3': '/ohh.mp3',
        'G3': '/ride.mp3',
        'A3': '/cymbal.mp3',
    },
    {
        'release': 1,
    })
    .toMaster();

document.addEventListener('DOMContentLoaded', main);

function main(): void {
    const pads = document.querySelector('.pads') as HTMLElement;
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
    sampler.triggerAttackRelease(note, '8n');
    element.classList.add('active');
}

function onEnd(element: HTMLElement) {
    element.classList.remove('active');
}
