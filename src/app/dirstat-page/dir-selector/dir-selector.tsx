
import './dir-selector.scss';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from '@mui/material';

import { DirstatService } from '../../services/dirstat-service';

import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';

interface DirSelectorProps {
  onSelect: (dirPath: string) => void;
}

export function DirSelector(props: DirSelectorProps) {
  const [ selectModalOpen, setSelectModalOpen ] = useState(false);
  const [ loadingDirs, setLoadingDirs ] = useState(false);
  const [ dirPaths, setDirPaths ] = useState<string[]>();
  const [ currDirPath, setCurrDirPath ] = useState<string>();
  const [ dirDrillHistory, setDirDrillHistory ] = useState<string[]>([]);

  useEffect(() => {
    let nextDirDrillHistory: string[];
    if(currDirPath === undefined) {
      return;
    }
    nextDirDrillHistory = dirDrillHistory.slice();
    nextDirDrillHistory.push(currDirPath);
    setLoadingDirs(true);
    DirstatService.getDirs(currDirPath).then(dirs => {
      setDirDrillHistory(nextDirDrillHistory);
      setLoadingDirs(false);
      setDirPaths(dirs);
    });
  }, [ currDirPath ]);

  return (
    <div className="dir-selector">
      <div className="dir-selector-button">
        <Button
          onClick={handleScanDirClick}
          variant="contained">
          Select Directory
        </Button>
      </div>
      <Modal
        open={selectModalOpen}
        onClose={handleModalClose}>
        <div className="dir-selector-modal-container">
          <div className="dir-selector-modal-header">
            Select A Directory
          </div>
          <div className="dir-selector-modal-body">
            {loadingDirs
              ? (
                <LoadingSpinner/>
              ) : (
                <div className="dir-menu">
                  {(dirDrillHistory.length > 0) && (
                    <div className="drill-action-container">
                      <div>
                        {dirDrillHistory[dirDrillHistory.length - 1]}
                      </div>
                      <div
                        className="back-button-container"
                        onClick={($e) => {
                          handleDrillBackClick();
                        }}
                      >
                        {'< Back'}
                      </div>
                    </div>
                  )}
                  <div>
                    {dirPaths?.map((dirPath, idx) => {
                      return (
                        <DirMenuItem
                          key={idx}
                          dirPath={dirPath}
                          onSelect={handleOnSelect}
                          onDrill={handleOnDrill}
                        />
                      );
                    })}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </Modal>
    </div>
  );

  function handleDrillBackClick() {
    let nextDirDrillHistory: string[], nextCurrDir: string;
    nextDirDrillHistory = dirDrillHistory.slice();
    console.log(nextDirDrillHistory);
    nextDirDrillHistory.pop();
    nextCurrDir = (nextDirDrillHistory.length > 0)
      ? nextDirDrillHistory.pop()
      : undefined
    ;
    if(nextCurrDir === undefined) {
      initDirMenu();
    }
    setDirDrillHistory(nextDirDrillHistory);
    setCurrDirPath(nextCurrDir);
  }

  function handleOnSelect(dirPath: string) {
    props.onSelect(dirPath);
    setSelectModalOpen(false);
  }
  function handleOnDrill(dirPath: string) {
    setCurrDirPath(dirPath);
  }

  function handleScanDirClick() {
    setSelectModalOpen(true);
    initDirMenu();
  }
  function initDirMenu() {
    setLoadingDirs(true);
    DirstatService.getDirs().then(dirs => {
      setDirPaths(dirs);
      setLoadingDirs(false);
    });
  }
  function handleModalClose() {
    setSelectModalOpen(false);
  }
}

interface DirMenuItemProps {
  dirPath: string;
  onSelect: (dirPath: string) => void;
  onDrill: (dirPath: string) => void;
}

function DirMenuItem(props: DirMenuItemProps) {
  return (
    <div className="dir-menu-item">
      <div
        className="dir-path"
        onClick={($e) => {
          props.onSelect(props.dirPath);
        }}
      >
        {props.dirPath}
      </div>
      <div
        className="dir-drill-container"
        onClick={($e) => {
          props.onDrill(props.dirPath);
        }}
      >
        <div className="drill-icon-container">
          {'>'}
        </div>
      </div>
    </div>
  );
}
