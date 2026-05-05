import Axios from 'axios';
import { useEffect, useState, type SetStateAction } from 'react';

export function CatFact() {
    const [catFact, setCatFact] = useState("");

    const fetchCatFact = () => {
            Axios.get('https://catfact.ninja/fact')
            .then((response: { data: { fact: SetStateAction<string>; }; }) => {
                setCatFact(response.data.fact);
            })
            .catch((error: any) => {
                console.error('Error fetching cat fact:', error);
            });
    }
    useEffect(() => {
        Axios.get('https://catfact.ninja/fact')
            .then((response: { data: { fact: SetStateAction<string>; }; }) => {
                setCatFact(response.data.fact);
            })
            .catch((error: any) => {
                console.error('Error fetching cat fact:', error);
            });
    
    }, []);



        return (
            <div className="cat-fact">
                <button onClick={fetchCatFact}> Cicás tény generálása</button>
                <p>{catFact}</p>
            </div>
        );
    }