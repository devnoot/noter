import { useRef, useState, useEffect } from 'react'
import './App.css'
import { Sampler } from 'tone'

import A3 from './notes/a3.mp3'
import A4 from './notes/a4.mp3'
import A5 from './notes/a5.mp3'
import B3 from './notes/b3.mp3'
import B4 from './notes/b4.mp3'
import B5 from './notes/b5.mp3'
import C3 from './notes/c3.mp3'
import C4 from './notes/c4.mp3'
import C5 from './notes/c5.mp3'
import D3 from './notes/d3.mp3'
import D4 from './notes/d4.mp3'
import D5 from './notes/d5.mp3'
import E3 from './notes/e3.mp3'
import E4 from './notes/e4.mp3'
import E5 from './notes/e5.mp3'
import F3 from './notes/f3.mp3'
import F4 from './notes/f4.mp3'
import F5 from './notes/f5.mp3'
import G3 from './notes/g3.mp3'
import G4 from './notes/g4.mp3'
import G5 from './notes/g5.mp3'

function App() {
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const registers = [3, 4, 5]

    const getRandomNote = () => notes[Math.floor(Math.random() * notes.length)]
    const getRandomRegister = () =>
        registers[Math.floor(Math.random() * registers.length)]

    const sampler = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mysteryNote, setMysteryNote] = useState(getRandomNote())
    const [mysteryRegister, setMysteryRegister] = useState(getRandomRegister())
    const [guesses, setGuesses] = useState(0)
    const [firstPlay, setFirstPlay] = useState(false)

    useEffect(() => {
        sampler.current = new Sampler(
            {
                A3,
                A4,
                A5,
                B3,
                B4,
                B5,
                C3,
                C4,
                C5,
                D3,
                D4,
                D5,
                E3,
                E4,
                E5,
                F3,
                F4,
                F5,
                G3,
                G4,
                G5,
            },
            {
                onload: () => {
                    setIsLoaded(true)
                },
            }
        ).toDestination()
    }, [])

    const playNote = (note, register) => {
        sampler.current.triggerAttackRelease(note + register.toString())
    }

    const guessNote = (note) => {
        if (note === mysteryNote) {
            alert('Correct!')
            const newNote = getRandomNote()
            const newRegister = getRandomRegister()
            setGuesses(0)
            setMysteryNote(newNote)
            setMysteryRegister(newRegister)
            setFirstPlay(false)
        } else {
            const newGuesses = guesses + 1
            setGuesses(newGuesses)
        }
    }

    const playMysteryNote = () => {
        if (!firstPlay) {
            setFirstPlay(true)
        }
        playNote(mysteryNote, mysteryRegister)
    }

    return (
        <div className="App">
            {isLoaded ? (
                <main className="App-main">
                    <h1>noter</h1>
                    <section className="nes-container with-title is-centered">
                        <p className="title">Guess the Note</p>
                        <p className="guesses">
                            {guesses}
                            <br />
                            Guesses
                        </p>
                        <div>
                            <button
                                type="button"
                                className="nes-btn is-primary btn-lg"
                                onClick={() => playMysteryNote()}
                            >
                                Play note
                            </button>
                        </div>
                        <div>
                            {notes.map((n) => (
                                <button
                                    type="button"
                                    className="nes-btn"
                                    key={n}
                                    onClick={() => guessNote(n)}
                                    disabled={!firstPlay}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section className="nes-container with-title is-centered">
                        <p className="title">Play a Note</p>
                        {notes.map((n) => (
                            <button
                                type="button"
                                className="nes-btn"
                                key={n}
                                onClick={() => playNote(n, 4)}
                            >
                                {n}
                            </button>
                        ))}
                    </section>
                </main>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default App
