import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { setLocalStorage, getLocalStorage } from '../../../../utils/local-storage-util';

import NavItem from './NavItem/index';

const Navigation = props => {
  const [pages, setPages] = useState([
    {
      title: 'Daily Tasks', 
      url: '/',
      isActive: true,
      isDisabled: false
    },
    {
      title: 'ToDo', 
      url: '/todo',
      isActive: false,
      isDisabled: false
    },
    {
      title: 'Projects', 
      url: '/projects',
      isActive: false,
      isDisabled: true
    },
    {
      title: 'Notes', 
      url: '/notes',
      isActive: false,
      isDisabled: true
    }
  ]);

  useEffect(() => {
    setPages(prevState => getLocalStorage('pages') || prevState);
  }, []);


  const turnPage = pageTitle => {
    const updatedPages = [ ...pages ];

    // 1. finding the index of the selected page
    const selectedPageIndex = updatedPages.findIndex(page => page.title === pageTitle);

    // 2. making all pages inactive
    updatedPages.forEach(page => {
      page.isActive = false
    });

    // 3. Activating the selected page by its index
    updatedPages[selectedPageIndex].isActive = true;

    // 4. Updating the state of pages
    setPages(updatedPages);

    // 5. Updating Local Storage
    setLocalStorage('pages', updatedPages);
  }

  return (
    <nav className={styles.Navigation}>
      {
        pages.map(page => (
          <NavItem
            key={page.url}
            linkURL={page.url}
            active={page.isActive}
            disabled={page.isDisabled}
            click={() => { turnPage(page.title) }}
            >
            {page.title}
          </NavItem>
        ))
      }
    </nav>
  );
};

export default Navigation;
