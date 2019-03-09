import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {flatternArr,parseToYearAndMonth,calculateID} from "./utility";
import axios from 'axios'


import Home from './Containers/Home'
import Create from './Containers/Create'

export const AppContext=React.createContext();

class App extends Component {
  constructor(props){
      super(props);
      this.state={
          items:{},
          categories:{},
		  isLoading:false,
          currentDate:parseToYearAndMonth(),
      };
      const withLoading=(cb)=>{
      	return (...args)=>{
			this.setState({
				isLoading:true
			});
			return cb(...args);
		};
	  };

      this.actions={
      	  getInitalData:withLoading(()=>{
      	  	  const {currentDate}=this.state;
      	  	  const getURLWithDate=`/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
      	  	  const promiseArr=[axios.get('/categories'),axios.get(getURLWithDate)];
      	  	  Promise.all(promiseArr).then(arr=>{
      	  	  	const [categories,items]=arr;
      	  	  	this.setState({
					items:flatternArr(items.data),
					categories:flatternArr(categories.data),
					isLoading:false
				})
			  });
		  }),
		  getEditData:withLoading( async (id)=>{
		  	  const {items,categories} =this.state;
		  	  let promiseArr=[];
		  	  if (Object.keys(categories).length===0){
				  promiseArr.push(axios.get('/categories'));
			  }
		  	  const itemAlreadyFetched=Object.keys(items).indexOf(id)>-1;
		  	  if (id && !itemAlreadyFetched) {
				  const getURLWithID=`/items/${id}`;
                  promiseArr.push(axios.get(getURLWithID));
			  }
		  	  const [fetchedCategories,editItem]=await Promise.all(promiseArr);
			  const finalCategories=fetchedCategories?flatternArr(fetchedCategories.data):categories;
			  const finalItem=editItem?editItem.data:items[id];
			  this.setState({
				  categories:finalCategories,
				  isLoading: false,
				  //items:{...this.state.items,[id]:editItem}
			  });
		  	  return {
		  	  	categories:finalCategories,
				editItem:finalItem
			  }
		  }),
          deleteItem:withLoading((item)=>{
      	  	  axios.delete(`/items/${item.id}`).then(()=>{
				  delete this.state.items[item.id];
				  this.setState({
					  items:this.state.items,
					  isLoading:false
				  })
			  });
          }),
          createItem:(data,categoryId)=>{
          	  const newId=calculateID();
          	  const parsedDate=parseToYearAndMonth(data.date);
          	  data.monthCategory=`${parsedDate.year}-${parsedDate.month}`;
          	  data.timestamp=new Date(data.date).getTime();
          	  const newItem={...data, id:newId, cid:categoryId,};

          	  axios.post(`/items`,newItem);
          	  this.actions.selectNewDate(parsedDate.year,parsedDate.month);
          },
		  selectNewDate:withLoading((year,month)=>{
			  const getURLWithDate=`/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
              axios.get(getURLWithDate).then(items=>{
              	this.setState({
					items:flatternArr(items.data),
					currentDate:{year,month},
					isLoading:false
				})
			  });
		  }),
		  updateItem:(item, updatedCategoryId)=>{
          	  const modifiedItem={
          	  	  ...item,
				  cid: updatedCategoryId,
				  timestamp:new Date(item.date).getTime(),
			  };
          	  axios.patch(`/items/${item.id}`,modifiedItem);

			  const parsedDate=parseToYearAndMonth(item.date);
			  this.actions.selectNewDate(parsedDate.year,parsedDate.month);
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
