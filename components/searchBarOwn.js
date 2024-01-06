import React, { useState } from 'react'
import {Tries} from '../TriesImplement';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function searchBarOwn({items}) {
    
    const [trie] = useState(() => {
        const t = new Tries();
        items.forEach(item => {
          t.insert(item.name, item);
        });
        return t;
      });
    
      const [query, setQuery] = useState("");
      const [results, setResults] = useState([]);
    
      const handleSearch = (e) => {
        setQuery(e.target.value);
        if (e.target.value) {
          setResults(trie.startsWith(e.target.value));
        } else {
          setResults([]);
        }
      };
    
      return (
        <div>
          <input type="text" value={query} onChange={handleSearch} placeholder="Search by name..." />
          <div>
            {results.map((result, index) => (
              <div key={index}>
                <img src={result.ProfileURL} alt={result.name} width="50" />
                <span>{result.name}</span>
                <span>{result.email}</span>
              </div>
            ))}
          </div>
        </div>
      );
    
}

export default searchBarOwn