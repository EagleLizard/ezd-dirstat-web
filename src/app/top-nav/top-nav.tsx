
import './top-nav.scss';
import React from 'react';

interface TopNavProps {

}

export function TopNav(props: TopNavProps) {
  return (
    <div className="top-nav">
      <div className="top-nav-content">
        <div className="app-title">
          EZD Dirstat
        </div>
      </div>
    </div>
  );
}
