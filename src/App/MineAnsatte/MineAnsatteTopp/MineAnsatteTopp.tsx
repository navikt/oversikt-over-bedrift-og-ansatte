
import './MineAnsatteTopp.less';
import React, {FunctionComponent, SyntheticEvent} from "react";
import {ToggleKnappPureProps} from "nav-frontend-toggle";
import {Arbeidsforhold} from "../../Objekter/ArbeidsForhold";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import {AlertStripeInfo} from "nav-frontend-alertstriper";
import ExcelEksport from "../ExcelEksport/ExcelEksport";
import {Ingress, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import Sokefelt from "../Sokefelt/Sokefelt";
import Filtervalg from "../Filtervalg/Filtervalg";
import SideBytter from "../SideBytter/SideBytter";
import {filtreringValgt, tellAntallAktiveOgInaktiveArbeidsforhold} from "../sorteringOgFiltreringsFunksjoner";

interface Props {
    responsFraAaregisteret: Arbeidsforhold[];
    listeMedArbeidsforhold: Arbeidsforhold[];
    valgtOrganisasjon: Organisasjon;
    antallSider: number;
    soketekst: string;
    setSoketekst: (soketekst: string) => void;
    antallVarsler: number;
   setIndeksOgGenererListe:  (indeks: number) => void;
    naVarendeSidetall: number;
    setSkalFiltrerePaVarsler: (skalFiltrerePaVarsler: boolean) => void;
    skalFiltrerePaVarsler: boolean
    setFiltrerPaAktiveAvsluttede: (filtrering: string) => void;
};


const MineAnsatteTopp: FunctionComponent<Props> = ({ setSoketekst, responsFraAaregisteret, listeMedArbeidsforhold, valgtOrganisasjon, soketekst, antallVarsler, setFiltrerPaAktiveAvsluttede, antallSider ,setIndeksOgGenererListe, setSkalFiltrerePaVarsler, skalFiltrerePaVarsler, naVarendeSidetall} ) => {

    const onSoketekstChange = (soketekst: string) => {
        setSoketekst(soketekst);
    };

    const velgFiltrering = (event: SyntheticEvent<EventTarget>,toggles: ToggleKnappPureProps[]) => {
        const filtrering = filtreringValgt(event, toggles);
        setFiltrerPaAktiveAvsluttede(filtrering);
    };

    return (
    <>
    {((responsFraAaregisteret.length === 0 && <AlertStripeInfo className = {"mine-ansatte__informasjon"}>Det finnes ingen arbeidsforhold rapportert inn til Aa-registret etter 01.01.2015 for valgt underenhet. Dersom dette er feil må det rettes opp via a-meldingen.</AlertStripeInfo>)
        || (responsFraAaregisteret.length > 0 && <> <div className={'mine-ansatte__header'}>
            <AlertStripeInfo className = {"mine-ansatte__informasjon"}>Under finner du en oversikt over arbeidsforhold rapportert inn etter 01.01.2015. Dersom du finner feil eller mangler i oversikten skal disse korrigeres/rapporteres inn via a-meldingen. </AlertStripeInfo>
            {listeMedArbeidsforhold.length>0 && <ExcelEksport
                arbeidsforholdListe={listeMedArbeidsforhold}
                navnBedrift={valgtOrganisasjon.Name}
                orgnrBedrift={valgtOrganisasjon.OrganizationNumber}
            />}
        </div>
            <div className={'mine-ansatte__sok-og-filter'}>
                <Normaltekst>Arbeidsforhold</Normaltekst>
                { responsFraAaregisteret.length > 0 && <Filtervalg anallVarsler={antallVarsler} filtreringValgt={velgFiltrering} overSiktOverAntallAktiveOgInaktive={tellAntallAktiveOgInaktiveArbeidsforhold(responsFraAaregisteret)} setfiltrerPaVarsler={() => setSkalFiltrerePaVarsler(!skalFiltrerePaVarsler)}/>
                }
                <Sokefelt onChange={onSoketekstChange} soketekst={soketekst} />
            </div>
            <div className={'mine-ansatte__topp'}>
                <div tabIndex={0} className={'mine-ansatte__antall-forhold'}>
                    <Normaltekst>Viser {listeMedArbeidsforhold.length} av {responsFraAaregisteret.length} arbeidsforhold</Normaltekst>
                </div>
                {antallSider > 1 && <SideBytter
                    plassering={"overst"}
                    className={'sidebytter'}
                    byttSide={setIndeksOgGenererListe}
                    antallSider={antallSider}
                    naVarendeSidetall={naVarendeSidetall}
                />}
            </div>
        </>))} {( responsFraAaregisteret.length > 0 && listeMedArbeidsforhold.length === 0 && <div className={"mine-ansatte__bytt-filtrering"}><Systemtittel>Finner ingen arbeidsforhold.</Systemtittel> <Ingress>Prøv å endre søkeord eller bytt filtreringsvalg.</Ingress></div>)}
        </>

);
};

export default MineAnsatteTopp;
