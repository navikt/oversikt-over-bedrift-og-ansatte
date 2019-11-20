import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import './InformasjonOmBedriftOgAnsatte.less';
import Lenke from 'nav-frontend-lenker';
import { basename } from '../../paths';
import Tabs from 'nav-frontend-tabs';

import Informasjon from './InformasjonOmBedrift/InformasjonOmBedrift';
import MineAnsatte from './MineAnsatte/MineAnsatte';
import {hentArbeidsforhold} from "../api/AAregApi";
import {OrganisasjonFraAltinn} from "../Objekter/OrganisasjonFraAltinn";


const InformasjonOmBedriftOgAnsatte: FunctionComponent = () => {
    const [visInfoEllerAnsatte, setVisInfoEllerAnsatte] = useState('informasjon');
    const [listeOverArbeidsForholdFraAareg, setlisteOverArbeidsForholdFraAareg] = useState([]);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState<OrganisasjonFraAltinn | null>(null);
    useEffect(() => {
        if (valgtOrganisasjon) {
            const hentArbeidsForhold = async () =>  {
                let objekt = await hentArbeidsforhold(valgtOrganisasjon.OrganizationNumber);
                if (objekt) {
                     setlisteOverArbeidsForholdFraAareg(objekt);

                }
                };
        }
    }, [valgtOrganisasjon]);

    const setStateForVisning = (index: number) => {
        if (index === 0) {
            setVisInfoEllerAnsatte('informasjon');
        }
        if (index === 1) {
            setVisInfoEllerAnsatte('ansatte');
        }
    };

    if (valgtOrganisasjon) {
        return (
            <>

                {' '}
                <div className="bedrift-og-ansatte-tab">
                    <Tabs
                        tabs={[{ label: 'Informasjon om bedrift' }, { label: 'Mine ansatte' }]}
                        onChange={(event: any, index: number) => setStateForVisning(index)}
                        kompakt
                    />
                </div>
                {visInfoEllerAnsatte === 'informasjon' && <Informasjon />}
                {visInfoEllerAnsatte === 'ansatte' && <MineAnsatte />}
                </>
        );

    }
};

export default InformasjonOmBedriftOgAnsatte;
