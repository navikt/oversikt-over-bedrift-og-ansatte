import React, {useEffect, useState} from 'react';
import './Progressbar.less';
import {Ingress} from "nav-frontend-typografi";

interface Props {
    beregnetTid: number;
    onProgress: (nyTid: number) => void;
    startTid: number;
    erFerdigLastet: boolean;
}

const Progressbar = ({ beregnetTid, startTid, erFerdigLastet }: Props) => {
    const [tid, setTid] = useState(0);
    const [visProgress, setVisProgress] = useState(true);
    const [bredde, setBredde] = useState("0%");

    const element = document.getElementById("progressbar__fyll");

    useEffect(() => {
        console.log("useEffect 1 kalles");
        if (bredde === "98%") {
            setTimeout(() => {setVisProgress(false); console.log("timeout ")},2000);
        }
    }, [ bredde]);

    useEffect(() => {
        console.log("useEffect 3");
        if (!erFerdigLastet && tid/beregnetTid < 0.999 && visProgress) {
            setTimeout( () => {
                const element = document.getElementById("progressbar__fyll");
                if (element) {
                    const naVarendeTid = new Date().getTime();
                    element.style.width =  ((tid/beregnetTid)*100).toString() + "%"
                    console.log("bredde sette i uE3 til, ", (tid/beregnetTid)*100);
                    const tidGatt = naVarendeTid - startTid;
                    setTid(tidGatt);
                    };
                }, beregnetTid/500);
            }
        if (erFerdigLastet && element) {
            element.style.width =  "98%"
            setBredde("98%");
        }

        }, [ beregnetTid, tid, startTid, erFerdigLastet, element, visProgress]);

    const tekst = (Math.floor((tid/beregnetTid)* 100)).toString() + "%";

    if (element) {
       console.log( element.offsetWidth, "bredde");
    }

    return (
       <> { visProgress && <div className={'progressbar__container'}>
            <Ingress className={'progressbar__henter-antall'}>Henter 5000 arbeidsforhold</Ingress>
            <div className={"progressbar__prosent"}>{tekst}</div>
        <div className="progressbar">
            <div className={"progressbar__fyll"} id={"progressbar__fyll"} />
        </div>
            </div>}
           </>
    );
};

export default Progressbar;
