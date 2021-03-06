import {hentFeatureTogglesLenke} from "../App/lenker";
import {FeatureToggles} from "../App/FeatureToggleProvider";

export async function hentFeatureToggles (): Promise<FeatureToggles> {
    const response = await fetch(hentFeatureTogglesLenke(), { credentials: 'same-origin' });
    return await response.json();
};