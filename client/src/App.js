import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from './components/NavBar';
import Buses from "./pages/Buses";
import BusForm from "./pages/BusForm";
import Favs from "./pages/Favs";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import Users from "./pages/Users";
import FavsForm from "./pages/FavsForm";


function App() {
  return (
    <>
    <Container>
    <Navbar />

    <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/buses" component={Buses} />
        <Route exact path="/buses/new" component={BusForm} />
        <Route exact path="/buses/edit/:id" component={BusForm} />

        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" component={UserForm} />
        <Route exact path="/users/edit/:id" component={UserForm} />

        <Route exact path="/favs" component={Favs} />
        <Route exact path="/favs/new" component={FavsForm} />
        <Route exact path="/favs/edit/:id" component={FavsForm} />

      </Switch>
      </Container>
    </>
  );
}

export default App;
