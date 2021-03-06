import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { basename } from './paths';
import LoginBoundary from './LoggInnBoundary';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import { ArbeidsforholdProvider } from './ArbeidsforholdProvider';
import { AltinnorganisasjonerProvider } from './AltinnorganisasjonerProvider';
import BedriftsmenyProvider from './BedriftsmenyProvider';
import FiltrerteOgSorterteArbeidsforholdProvider from './FiltrerteOgSorterteArbeidsforholdProvider';
import EnkeltArbeidsforhold from './MineAnsatte/EnkeltArbeidsforhold/EnkeltArbeidsforhold';
import { MineNåværendeArbeidsforhold, MineTidligereArbeidsforhold } from './MineAnsatte/MineAnsatte';
import './App.less';

const App = () => {
    return (
        <div className="app">
            <LoginBoundary>
                <FeatureToggleProvider>
                    <AltinnorganisasjonerProvider>
                        <BrowserRouter basename={basename}>
                            <BedriftsmenyProvider>
                                <ArbeidsforholdProvider>
                                    <FiltrerteOgSorterteArbeidsforholdProvider>
                                        <Switch>
                                            <Route exact path="/" component={MineNåværendeArbeidsforhold} />
                                            <Route
                                                exact
                                                path="/enkeltArbeidsforhold"
                                                component={EnkeltArbeidsforhold}
                                            />
                                            <Route
                                                exact
                                                path="/tidligere-arbeidsforhold"
                                                component={MineTidligereArbeidsforhold}
                                            />
                                            <Route
                                                exact
                                                path="/tidligere-arbeidsforhold/enkeltArbeidsforhold"
                                                component={EnkeltArbeidsforhold}
                                            />
                                        </Switch>
                                    </FiltrerteOgSorterteArbeidsforholdProvider>
                                </ArbeidsforholdProvider>
                            </BedriftsmenyProvider>
                        </BrowserRouter>
                    </AltinnorganisasjonerProvider>
                </FeatureToggleProvider>
            </LoginBoundary>
        </div>
    );
};

export default App;
