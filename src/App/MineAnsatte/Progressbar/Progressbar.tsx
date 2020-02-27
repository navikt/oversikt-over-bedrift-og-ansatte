import React, { useState} from 'react';
import './Progressbar.less';
import {Ingress} from "nav-frontend-typografi";

interface Props {
    beregnetTid: number;
    startTid: number;
    erFerdigLastet: boolean;
    setSkalvises: (vises: boolean) => void;
    antall: number;
}

const Progressbar = ({ beregnetTid, startTid, erFerdigLastet, setSkalvises, antall }: Props) => {
    const [tid, setTid] = useState(0);

    const [bredde, setBredde] = useState(0);

        const element = document.getElementById("progressbar__fyll");

        if (bredde >= 98 && erFerdigLastet) {
            setSkalvises(false);
        }
        else {
            if (!erFerdigLastet && tid/beregnetTid < 0.94) {
                setTimeout( () => {
                    const element = document.getElementById("progressbar__fyll");
                    if (element) {
                        const naVarendeTid = new Date().getTime();
                        const beregnetBredde = (tid/beregnetTid)*100
                        element.style.width =  beregnetBredde.toString() + "%"
                        setBredde(beregnetBredde);
                        const tidGatt = naVarendeTid - startTid;
                        setTid(tidGatt);
                    };
                }, beregnetTid/500);
            }
            if (erFerdigLastet && element && bredde+2<100) {
                setTimeout( () => {
                    element.style.width =  (bredde+2).toString() + "%";
                    setBredde(bredde+2);
                }, 15);
            }
        }

        const tekst = Math.floor(bredde).toString() + "%"

    return (<div className={'progressbar__container'}>
            <Ingress className={'progressbar__henter-antall'}>{"Henter "+ antall +" arbeidsforhold"}</Ingress>
            <div className={"progressbar__prosent"}>{tekst}</div>
        <div className="progressbar">
            <div className={"progressbar__fyll"} id={"progressbar__fyll"} />
        </div>
            </div>
    );
};

export default Progressbar;