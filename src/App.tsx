import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { ApiDetailsPage } from './pages/ApiDetailsPage';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/api-details" component={ApiDetailsPage} />
            </Switch>
        </Router>
    );
};

export default App;
