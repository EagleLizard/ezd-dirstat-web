
import './loading-spinner.scss';
import React from 'react';

interface LoadingSpinnerProps {

}

export function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
