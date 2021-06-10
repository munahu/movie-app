import { useEffect, useState } from 'react';

function useGetStorage(name) {
    const [item, setItem] = useState();

    useEffect(() => {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (name === key) {
                const storedItem = JSON.parse(localStorage.getItem(key));
                setItem(storedItem);
            }
        });
    }, [name])
    
    return item;   
}


export default useGetStorage;