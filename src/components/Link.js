import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {    //helper function
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault(); //to prevent from full page reload
    window.history.pushState({}, '', href);   //in console

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
