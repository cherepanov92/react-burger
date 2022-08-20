import React, {useContext, useState} from 'react';

import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerContext } from "../../context/BurgerContextProvider";

import styles from './App.module.css';

function App() {
    const { error, fetching } = useContext(BurgerContext);
    const [modalComponent, setModalComponent] = useState(null);
    const closeModal = () => setModalComponent(null);

    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                {error &&
                    <p className="text text_type_main-large">
                        Error: {error}
                    </p>}
                {fetching &&
                    <p className="text text_type_main-large">
                        Loading ...
                    </p>
                }
                {!error && !fetching &&
                    <>
                        <BurgerIngredients attachModal={setModalComponent} onClose={closeModal}/>
                        <BurgerConstructor attachModal={setModalComponent} onClose={closeModal}/>
                    </>
                }
            </main>
            {modalComponent}
        </div>
    );
}

export default App;
