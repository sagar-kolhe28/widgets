import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {  //helper function
      //console.log("in useEffet");
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });
      setResults(data.query.search);  // fetching data into results variable
    };

    if (term && !results.length) {     // for first time rendering
      search();   
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000); //delay by 1 sec

      return () => {
        clearTimeout(timeoutId);
      };
    }
    
  }, [term]);   //[term] is a second argument of useEffect

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        
        <div className="right floated content">
          <a className = "ui button"
          href={`http://en.wikipedia.org?curid=${result.pageid}`}
          > Visit</a>
        </div>
        
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
