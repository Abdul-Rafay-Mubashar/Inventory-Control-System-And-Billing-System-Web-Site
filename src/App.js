import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddNewInventry from './AddNewInventry';
import ViewBills from './ViewBills';
import UpdateStock from './UpdateStock';
import UpdatePrice from './UpdatePrice';
import DeleteItem from './DeleteItem';
import Update from './Update';
import Slider from './Slider';
import CustomerForm from './CustomerForm';
import BillItemsAdd from './BillItemsAdd';
import InvoiceBill from './InvoiceBill';
import IDSearch from './IDSearch';
import EmailSearch from './EmailSearch';
import SearchbyPhone from './SearchbyPhone';
import ID from './ID';
import Loading from './Loading';





function App() {

  return (
    <>
      <Router>
      <Switch>
        <Route exact path="/" component={AddNewInventry} />
        <Route path="/ViewBills" component={ViewBills} />
        <Route path="/AddCustomer" component={CustomerForm} />
        <Route path="/AddBill" component={BillItemsAdd} />
        <Route path="/InVoice" component={InvoiceBill} />
        <Route path="/SearchByName" component={IDSearch} />
        <Route path="/SearchByEmail" component={EmailSearch} />
        <Route path="/SearchByID" component={ID} />
        <Route path="/SearchByPhone" component={SearchbyPhone} />
        <Route path="/UpdateItem" component={Update} />
      </Switch>
    </Router>
    {/* <Loading/> */}
    </>
  );
}

export default App;
