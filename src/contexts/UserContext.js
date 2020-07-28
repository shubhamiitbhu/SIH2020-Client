import React from 'react';

export default React.createContext({
	language: 'en',
	changeLanguage: (language) => {},
});
