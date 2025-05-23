'use client'
import { useState, useEffect } from "react";
export function Tracker() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
         fetch  ('/api/sites')
        .then((res)=> res.json())
        .then((data) => {
            setData(data)
            setLoading(false);
        });
    }, []);
    

    return (
        <div>
            This is the tracker script. !!
        </div>
    );
}