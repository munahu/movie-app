import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home/components/Home';
import SelectedMovie from './selected movie/components/SelectedMovie';
import Watchlist from './watch list/components/Watchlist';
import NowPlaying from "./now playing/NowPlaying";
import Trending from "./shared/components/Trending";
import TopRated from "./shared/components/TopRated";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/watchlist" component={Watchlist}/>
        <Route path="/trending" component={Trending} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/now-playing" component={NowPlaying} />
        <Route path="/:id" component={SelectedMovie}/>
      </Switch>
    </Router>
  );
}

export default App;
