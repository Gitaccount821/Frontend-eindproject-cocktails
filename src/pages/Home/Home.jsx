import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import AppContainer from '../../components/AppContainer/AppContainer';
import './Home.css';
import MainContent from '../../components/MainContent/MainContent';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <AppContainer>
            <MainContent>
                <section className="flex-item section2">
                    <div>
                        <p className="small-text">welkom op de site</p>
                        <h1>Cocktail Shaker</h1>
                    </div>
                </section>
                <section className="flex-item section3">
                    <article className="midden-tekst-container">
                        <p className="small-text">
                            Welkom op deze website! Deze website is bedoelt voor het opslaan van cocktail recepten en
                            je helpen om de beste cocktails aangeraden te krijgen op basis van jouw huidige stemming!
                            Log graag eerst in om tot alle functies toegang te krijgen, en ga op avontuur met de
                            'Aangeraden Cocktails' knop bovenin om jouw ideale cocktail te vinden.
                        </p>
                    </article>
                </section>
                </MainContent>
        </AppContainer>
    );
}

export default Home;
