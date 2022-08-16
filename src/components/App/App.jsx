import React, { useEffect, useState } from 'react';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { API_INGREDIENTS_URL } from "../../utils/constants";

import styles from './App.module.css';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    const [modalComponent, setModalComponent] = useState(null);
    const closeModal = () => setModalComponent(null);

    useEffect(() => {
        fetch(API_INGREDIENTS_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Статус ${response.status}`);
            })
            .then(responseData => setData(responseData.data))
            .catch((err) => {
                setError(err)
            });
    }, [])

    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                {error &&
                    <p className="text text_type_main-large">
                        Error: {error}
                    </p>}
                {!data.length &&
                    <p className="text text_type_main-large">
                        Loading ...
                    </p>
                }
                {!error && !!data.length &&
                    <>
                        <BurgerIngredients ingredients={data} attachModal={setModalComponent} onClose={closeModal}/>
                        <BurgerConstructor ingredients={data} attachModal={setModalComponent} onClose={closeModal}/>
                    </>
                }
            </main>
            {modalComponent}
        </div>
    );
}

export default App;
