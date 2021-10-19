import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Deck: uses deck API, allows drawing card at a time. */

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  // these are toggled to true to begin events
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);


  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      let d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(d.data);
    }
    fetchData();
  }, [setDeck]);


  useEffect(function drawCardAddToDrawn() {
    async function fetchCard() {
      try {
        let drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

        setIsDrawing(false);
        if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

        const card = drawRes.data.cards[0];

        setDrawn(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    }

    if (isDrawing) fetchCard();
  }, [isDrawing, deck]);


  useEffect(function shuffleDeckViaAPI() {
    async function shuffleDeck(deck) {
      try {
        await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
        setDrawn([]);
        setIsShuffling(false);
      } catch (err) {
        alert(err);
      }
    }

    if (isShuffling && deck) shuffleDeck(deck);
  }, [isShuffling, deck]);


  /** Draw card: change the state & effect will kick in. */
  function draw() {
    setIsDrawing(true);
  }

  /** Shuffle: change the state & effect will kick in. */
  function startShuffling() {
    return setIsShuffling(true);
  }

  /** Return draw button (disabled if shuffling) */
  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
        <button
            className="Deck-gimme"
            onClick={draw}
            disabled={isShuffling}>
          DRAW
        </button>
    );
  }

  /** Return shuffle button (disabled if already is) */
  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
        <button
            className="Deck-gimme"
            onClick={startShuffling}
            disabled={isShuffling}>
          SHUFFLE DECK
        </button>
    );
  }

  return (
      <main className="Deck">

        { renderDrawBtnIfOk() }
        { renderShuffleBtnIfOk() }

        <div className="Deck-cardarea">{
          drawn.map(c => (
              <Card key={c.id} name={c.name} image={c.image} />
          ))}
        </div>

      </main>
  );
}

export default Deck;
