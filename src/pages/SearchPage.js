import React from 'react';
import "./SearchPage.css";
import { useStateValue } from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import response from '../response';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ImageIcon from '@material-ui/icons/Image';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
    const {data} = useGoogleSearch(term);
    // const data = response;
    // console.log(data);
    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img 
                        className="searchPage__logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
                        alt=""
                    />                    
                </Link>
                <div className="searchPage__headerBody">                
                    <Search hideButtons />

                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <DescriptionIcon />
                                <Link to="/news">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageIcon />
                                <Link to="/images">Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon />
                                <Link to="/shopping">Shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon />
                                <Link to="/maps">Maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon />
                                <Link to="/more">More</Link>
                            </div>
                        </div>
                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">                            
                                <Link to="/settings">Settings</Link>
                            </div>                            
                            <div className="searchPage__option">                            
                                <Link to="/tools">Tools</Link>
                            </div>                                                        
                        </div>
                    </div>
                </div>  
                <div className="searchPage__headerRight">
                    <Link to="https://gmail.com">Gmail</Link>                                        
                    <Avatar />
                </div>                          
            </div>
           {
               term && (
                <div className="searchPage__results">     
                    <p 
                        className="searchPage__resultCount">
                            About {data?.searchInformation.formattedTotalResults}
                             results ({data?.searchInformation.formattedSearchTime}
                              seconds) for {term}
                    </p>

                    {
                        data?.items.map(item => (
                            <div className="searchPage__result">
                                <a  className="searchPage__resultLink"
                                    href={item.displayLink}>
                                    {
                                        item.pagemap?.cse_image?.length > 0 &&
                                        item.pagemap?.cse_image[0]?.src && (
                                            <img
                                                className="searchPage__resultImage"
                                                src={                                                    
                                                    item.pagemap?.cse_image[0]?.src
                                                }
                                                alt=""
                                            />
                                        )
                                    }
                                    {item.displayLink} ∇
                                </a>
                                <a 
                                    className="searchPage__resultTitle"
                                    href={item.link}
                                >
                                    <h2>{item.title}</h2>
                                </a>
                                <p
                                    className="searchPage__resultSnippet"                                    
                                >
                                    {item.snippet}
                                </p>
                            </div>
                        ))
                    }
                </div>
               )
           }
        </div>
    )
}

export default SearchPage
