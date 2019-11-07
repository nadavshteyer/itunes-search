import React, {useState, useEffect} from 'react';
import SingleResult from './SingleResult/SingleResult.js';
import './SearchPage.css';
import Drawer from '../Drawer/Drawer.js'
import { Input, FormControl,Button, Popover } from '@material-ui/core';
import { useAuth } from '../../context/auth.js'

function SearchPage() {
  const [inputValue, setInputValue] = useState('')  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchResultsData,setSearchResultsData ] = useState([])
  const [drawerData, setDrawerData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [topTenSearchs, setTopTenSearch] = useState([])
  const {authTokens} = useAuth()
  
  const onInputChange = e => setInputValue(e.target.value);

  const OnSearch = (e)=> {

    fetch(`http://localhost:8080/searchAPi?term=${inputValue}&username=${authTokens}`,{
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
      .then( data => {
        setSearchResultsData(data.results)  
        setInputValue('')
      })
      .catch((err) => {
        console.log('Looks like there was a problem: \n', err);
      });
  }
  
  useEffect(() => {
    
    fetch(`http://localhost:8080/topTenSearchs?username=${authTokens}`,{
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
      .then( data => {
        console.log(data)
        if (data.length > 0) {
          setTopTenSearch([{
            search: 'term',
            count: 'count',
            _id: 'legend'
          },...data])
        } else {
          setTopTenSearch([{search: 'term', count: 'count', _id: 'legend'},
          {search: 'No Searchs Yet!', count: '', _id: 'temp'}])
        }


      })
      .catch((err) => {
        console.log('Looks like there was a problem: \n', err);
      });

  }, []);

  const handlePopoverOpen = event => setAnchorEl(event.currentTarget)
  const handlePopoverClose = () => setAnchorEl(null)
  const popoverOpen = Boolean(anchorEl);

  return (
    <div className="searchPageRootDiv">
      <Drawer open={isDrawerOpen} onCloseDrawer={()=>setIsDrawerOpen(false)}>
        <SingleResult key={drawerData.trackId} data={drawerData}/>
      </Drawer>

      <Popover
          onClose={handlePopoverClose}
          open={popoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className={'popoverRoot'}
        >
          <div style={{minWidth: '150px'}}>
            {topTenSearchs.map(element => {
              return (<div key={element._id} className={'topTenSearch'}>
                <span>{element.search}</span>
                <span>{element.count}</span>
              </div>)
            })}
          </div>
      </Popover>
      
      <div style={{display: "flex", height: "100%",width: "100%", flexDirection: "column"}}>
          <div style={{marginBottom: "20px"}}>
            <FormControl>
              <Input  placeholder="Search Itunes..." name="search" id="search" value={inputValue} onChange={onInputChange}/>
            </FormControl>
            <Button onClick={OnSearch}>Search Me!</Button>
            <span style={{marginLeft: '10px'}} onMouseOver={handlePopoverOpen} >top 10 searchs</span>
          </div>
          <span>Press one of the items to see all of there data!</span>
          <div className={'resultsWraper'}>
            { searchResultsData.map((element)=> {
                return(
                  <div key={element.trackId} className={'singleResultFromSearch'} onClick={()=>{setIsDrawerOpen(true);setDrawerData(element)}}>
                        <img alt={"Items Artwork"} src={element.artworkUrl100}/>
                        <span>{element.trackName}</span>
                  </div>
              )
              
            })}
          </div>
      </div>
    </div>
  );
}

export default SearchPage;