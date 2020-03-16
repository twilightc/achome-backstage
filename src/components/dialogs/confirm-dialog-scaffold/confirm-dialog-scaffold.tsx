import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Iprops {
  titleText: string;
  contentText?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClosed: () => void;
}

const ConfirmDialogScaffold: FC<Iprops> = ({
  titleText,
  contentText,
  isOpen,
  onConfirm,
  onClosed,
  children
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          {children}
          <DialogContentText id="confirm-dialog-description">
            {contentText ? contentText : '確認要進行此項動作嗎?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClosed()} color="primary">
            取消
          </Button>
          <Button onClick={() => onConfirm()} color="primary" autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialogScaffold;
