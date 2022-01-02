
import './dirstat-page.scss';
import React, { useState } from 'react';

import { DirSelector } from './dir-selector/dir-selector';
import { Button } from '@mui/material';

export const DIRSTAT_PAGE_ROUTE = 'dirstat';

interface DirstatPageProps {

}

export function DirstatPage(props: DirstatPageProps) {
  const [ selectedDirPath, setSelectedDirPath ] = useState<string>();

  return (
    <div className="dirstat-page">
      <div className="dirstat-toolbar">
        <div className="dir-selector-container">
          <DirSelector
            onSelect={handleDirSelect}
          />
        </div>
      </div>
      {selectedDirPath && (
        <div className="dirstat-content">
          <div className="selected-dir-text-container">
            <div className="selected-dir-text">
              {selectedDirPath}
            </div>
          </div>
          <div className="scan-button-container">
            <Button
              variant="contained"
              color="secondary">
              Scan
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  function handleDirSelect(dirPath: string) {
    setSelectedDirPath(dirPath);
  }
}

