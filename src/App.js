import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {testItems,testCategories} from './testData'
import {flatternArr,parseToYearAndMonth} from "./utility";

import Home from './Containers/Home'
import Create from './Containers/Create'

export const AppContext=React.createContext();

class App extends Component {
  constructor(props){
      super(props);
      this.state={
          items:flatternArr(testItems),
          categories:flatternArr(testCategories),
          currentDate:parseToYearAndMonth('2018-08-10'),
      };
      this.actions={
          deleteItem:(item)=>{
              delete this.state.items[item.id];
              this.setState({
                  items:this.state.items,
              })
          },
          createItem:(data,categoryId)=>{
          	  const newId=Object.keys(this.state.items).length+1;
          	  const parsedDate=parseToYearAndMonth(data.date);
          	  data.timestamp=new Date(data.date).getTime();
          	  const newItem={...data, id:newId, cid:categoryId,};
          	  console.log(newItem);
          	  this.setState({
				  items:{...this.state.items, [newId]:newItem},
			  })
          },
		  selectNewDate:(year,month)=>{
			  this.setState({
				  currentDate:{year,month},
			  });
		  },
		  updateItem:(item, updatedCategoryId)=>{
          	  const modifiedItem={
          	  	  ...item,
				  cid: updatedCategoryId,
				  timestamp:new Date(item.date).getTime(),
			  };
			  this.setState({
				  items:{...this.state.items, [modifiedItem.id]:modifiedItem},
			  });
	      },
      }
  }
    render() {
    return (
        <AppContext.Provider value={{
            state:this.state,
            actions:this.actions,
        }}>
        <Router>
            <div className="container p-3">
                <div className="App">
                    <Route path="/" exact component={Home}/>
                    <Route path="/create" component={Create}/>
                    <Route path="/edit/:id" component={Create}/>
                </div>
            </div>
        </Router>
        </AppContext.Provider>
    );
  }
}

export default App;
