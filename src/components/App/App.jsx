import React, { useEffect, useState } from 'react';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { Modal } from "../Modal";
import { API_INGREDIENTS_URL } from "../../utils/constants";

import styles from './App.module.css';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <BurgerIngredients ingredients={data} />
                        <BurgerConstructor ingredients={data} />
                    </>
                }
            </main>
            {isModalOpen && <Modal title={'title'} onClose={() => setIsModalOpen(false)}><p>123123</p></Modal>}
        </div>
    );
}

export default App;
